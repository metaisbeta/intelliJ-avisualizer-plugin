package org.jetbrains.plugins.template.services

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
import org.jetbrains.plugins.template.SettingsChangedAction
import java.io.File
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

data class AvisualizerModel(val name: String, val cv: String, val pv: String, val sv: String)
data class AvisualizerModelResponse(val id: String, val name: String, val cv: String, val sv: String, val pv: String, val last_update: String)

class ASnifferService : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        runAsync {
            runAsniffer(e)
        }.onSuccess {
            print("acabou");
        }
    }

    fun runAsniffer(e: AnActionEvent) {
        if (e.project?.basePath != null) {
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
                .uri(URI.create("https://avisualizer-plugin.herokuapp.com/data/save"))
                .header("Content-Type","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build()
            val response = client.send(request, HttpResponse.BodyHandlers.ofString());

            val modelResponse: AvisualizerModelResponse = mapper.readValue(response.body())

            GivServiceSettings.instance().addFavorite("https://avisualizer-plugin.herokuapp.com?projeto=${modelResponse.id}")
            val bus = ApplicationManager.getApplication().messageBus
            bus.syncPublisher(SettingsChangedAction.TOPIC).settingsChanged()
        }
    }


}

