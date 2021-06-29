package org.jetbrains.plugins.template

import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import java.nio.file.Paths


class WindowFactory : ToolWindowFactory {
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val givExplorer = AVisualizerToolWindow.getInstance(project)
        givExplorer.initializePanel(toolWindow)
    }
}