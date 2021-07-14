package org.jetbrains.plugins.template

import com.intellij.openapi.Disposable
import com.intellij.openapi.components.ServiceManager
import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.util.Disposer
import com.intellij.openapi.wm.ToolWindow
import com.intellij.ui.content.Content
import com.intellij.ui.content.ContentFactory

class AVisualizerToolWindow : DumbAware, Disposable {

    private val givPanel: MainPanel = MainPanel()

    fun initializePanel(toolWindow: ToolWindow) {
        val contentFactory = ContentFactory.SERVICE.getInstance()

        val content: Content = contentFactory.createContent(null, null, false)
        content.component = givPanel

        Disposer.register(this, givPanel)
        toolWindow.contentManager.addContent(content)
    }

    companion object {
        fun getInstance(project: Project): AVisualizerToolWindow = ServiceManager.getService(project, AVisualizerToolWindow::class.java)
    }

    override fun dispose() {}
}