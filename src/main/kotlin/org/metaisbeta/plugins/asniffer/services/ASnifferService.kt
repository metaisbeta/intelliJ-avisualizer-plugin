package org.metaisbeta.plugins.asniffer.services

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.github.phillima.asniffer.ASniffer
import com.github.phillima.asniffer.model.AMReport
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.application.ApplicationManager
import org.jetbrains.concurrency.runAsync
import org.metaisbeta.plugins.asniffer.ErrorPageAction
import org.metaisbeta.plugins.asniffer.SettingsChangedAction
import org.metaisbeta.plugins.asniffer.LoadingPageAction
import java.io.File
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.time.LocalDateTime

data class AvisualizerModel(val name: String, val cv: String, val pv: String, val sv: String)
data class AvisualizerModelResponse(val id: String, val name: String, val hash: String, val cv: String, val sv: String, val pv: String, val persist: Boolean, val consults: Long, val last_update: String)
data class AvisualizerProjectIdentification(val id: String, val last_updated: String)
data class ErrorModel(val os: String, val project_name: String, val error_message: String)
var visualizerURL = "https://avisualizer.vercel.app"

class ASnifferService : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        runAsync {
            RunAsnifferPersist(e)
        }.onSuccess {

        }
    }

    fun RunAsnifferPersist(e: AnActionEvent) {

        try {
            if (e.project?.basePath != null) {
                ExecuteAsnifferAnalysis(e, true);
            }
        } catch (er: Exception) {
            HandleError(e, er);
        }

    }
}

    fun ExecuteAsnifferAnalysis(e: AnActionEvent, persist: Boolean){
        ApplicationManager.getApplication().messageBus.syncPublisher(LoadingPageAction.LOADING_TOPIC).loadingPage()
        var basePath = e.project?.basePath
        val projectPath: Path = Paths.get(basePath + File.separator + ".idea" + File.separator + "asniffer")
        val report: AMReport = ASniffer(basePath, basePath).collectSingle()

        val directory = File(projectPath.toUri())
        if (!directory.exists()) {
            directory.mkdir()
        }

        val dirPathResults: String = Paths.get(projectPath.toString()).normalize().toString()

        //Bug
        JSONReportCV().generateReport(report, dirPathResults)
        JSONReportSV().generateReport(report, dirPathResults)
        JSONReportPV().generateReport(report, dirPathResults)

        val cvString: String = Files.readString(Paths.get(projectPath.toString(), e.project!!.name + "-CV.json"), StandardCharsets.UTF_8)
        val pvString: String = Files.readString(Paths.get(projectPath.toString(), e.project!!.name + "-PV.json"), StandardCharsets.UTF_8)
        val svString: String = Files.readString(Paths.get(projectPath.toString(), e.project!!.name + "-SV.json"), StandardCharsets.UTF_8)


        var model = AvisualizerModel(e.project!!.name, cvString, pvString, svString);
        val mapper = jacksonObjectMapper()
        val requestBody: String = mapper.writeValueAsString(model)

        val client = HttpClient.newBuilder().build();
        val request = HttpRequest.newBuilder()
            .uri(URI.create("https://asniffer-web-api.herokuapp.com/data/save?persist=$persist"))
            .header("Content-Type","application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build()
        val response = client.send(request, HttpResponse.BodyHandlers.ofString());

        val modelResponse: AvisualizerModelResponse = mapper.readValue(response.body())

        var modelIdentification = AvisualizerProjectIdentification(modelResponse.id, LocalDateTime.now().toString());
        mapper.writeValue(File(Paths.get(projectPath.toString(), e.project!!.name + "-metadata.json").toString()),modelIdentification);

        GivServiceSettings.instance().saveHomePage(visualizerURL + "?projeto=${modelResponse.id}")
        ApplicationManager.getApplication().messageBus.syncPublisher(SettingsChangedAction.TOPIC).settingsChanged()
    }

    fun HandleError(e: AnActionEvent, er: Exception){
        ApplicationManager.getApplication().messageBus.syncPublisher(ErrorPageAction.ERROR_TOPIC).errorPage()
        try{
            var model = ErrorModel(System.getProperty("os.name"),e.project!!.name, er.toString());
            val mapper = jacksonObjectMapper()
            val requestBody: String = mapper.writeValueAsString(model)

            val client = HttpClient.newBuilder().build();
            val request = HttpRequest.newBuilder()
                .uri(URI.create("https://asniffer-web-api.herokuapp.com/data/error"))
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build()

            client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (er2: Exception){
            //Non-blocking error
        }
    }




