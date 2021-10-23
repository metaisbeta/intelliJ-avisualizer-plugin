package org.jetbrains.plugins.template.services

import com.intellij.openapi.project.Project

class MyProjectService(project: Project) {

    init {
        print(project.name)
    }

}
