package org.jetbrains.plugins.template.services

import com.github.phillima.asniffer.ASniffer
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV
import com.github.phillima.asniffer.output.json.d3hierarchy.packageview.JSONReportPV
import com.github.phillima.asniffer.output.json.d3hierarchy.systemview.JSONReportSV
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import java.io.File


class ASnifferService : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        if(e.project?.basePath != null){
            var basePath = e.project?.basePath
            val report = ASniffer(basePath, basePath).collectSingle()
            val dirPathResults: String = basePath + File.separator + "asniffer_results"
            File(dirPathResults).mkdir()
            JSONReportCV().generateReport(report, dirPathResults)
            JSONReportSV().generateReport(report, dirPathResults)
            JSONReportPV().generateReport(report, dirPathResults)
        }
    }

}