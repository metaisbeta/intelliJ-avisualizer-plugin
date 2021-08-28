package org.jetbrains.plugins.template.services

import com.github.phillima.asniffer.ASniffer
import com.github.phillima.asniffer.output.json.d3hierarchy.classview.JSONReportCV
import com.intellij.openapi.project.Project
import org.jetbrains.plugins.template.MyBundle

class MyProjectService(project: Project) {

    init {
        println(MyBundle.message("projectService", project.name))
        //val teste = System.getProperty("user.dir") + "/libs/avisualizer-back.jar"
        //println(teste)
        //val pb = ProcessBuilder("java", "-jar", teste)
        //val p = pb.start()
        ASniffer(project.basePath, project.basePath, JSONReportCV()).collectSingle();
        //ASniffer(project.basePath, project.basePath, JSONReportPV()).collectSingle();
        //ASniffer(project.basePath, project.basePath, JSONReportSV()).collectSingle();
    }
}
