package org.jetbrains.plugins.template.services

import com.github.phillima.asniffer.ASniffer
import com.github.phillima.asniffer.model.AMReport
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import org.jetbrains.concurrency.runAsync
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths


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
        }
    }

}