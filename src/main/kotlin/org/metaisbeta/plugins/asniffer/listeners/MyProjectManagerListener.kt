package org.metaisbeta.plugins.asniffer.listeners

import org.metaisbeta.plugins.asniffer.services.MyProjectService
import com.intellij.openapi.project.Project
import com.intellij.openapi.project.ProjectManagerListener

internal class MyProjectManagerListener : ProjectManagerListener {
    override fun projectOpened(project: Project) {
        project.getService(MyProjectService::class.java)
    }
}
