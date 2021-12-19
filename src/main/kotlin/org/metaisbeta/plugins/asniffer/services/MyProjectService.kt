package org.metaisbeta.plugins.asniffer.services

import com.intellij.openapi.project.Project
import org.metaisbeta.plugins.asniffer.MyBundle

class MyProjectService(project: Project) {

    init {
        println(MyBundle.message("projectService", project.name))
    }
}
