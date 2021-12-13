package org.jetbrains.plugins.template.listeners

import org.jetbrains.plugins.template.services.MyProjectService
import com.intellij.openapi.project.Project
import com.intellij.openapi.project.ProjectManagerListener

internal class MyProjectManagerListener : ProjectManagerListener {
    override fun projectOpened(project: Project) {
        project.getService(MyProjectService::class.java)
    }
}
