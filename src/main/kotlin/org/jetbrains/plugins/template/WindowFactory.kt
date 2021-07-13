package org.jetbrains.plugins.template

import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import java.io.File
import java.nio.file.Paths


class WindowFactory : ToolWindowFactory {
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        // Run a java app in a separate system process
        //TODO fix this to run everywhere - Visualizer as JAR dependency.
        val teste = Paths.get("C:\\Users\\Sergio\\Documents\\Projetos\\TCC\\intelliJ-avisualizer-plugin\\libs\\avisualizer-back.jar").toString()
        Runtime.getRuntime().exec("java -jar $teste")
        val givExplorer = AVisualizerToolWindow.getInstance(project)
        givExplorer.initializePanel(toolWindow)
    }
}