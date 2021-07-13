package org.jetbrains.plugins.template

import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import java.io.File
import java.nio.file.Paths


class WindowFactory : ToolWindowFactory {
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        // Run a java app in a separate system process
        // Run a java app in a separate system process
        val teste = Paths.get("C:\\Users\\Sergio\\Documents\\Projetos\\TCC\\intelliJ-avisualizer-plugin\\libs\\avisualizer-back.jar").toString()
  /*      val teste2 = Paths.get(System.getProperty("user.home") + "src/main/resources/libs/start.bat").toString()

        val file = File("resources/abc.txt")
        val absolutePath: String = file.getAbsolutePath()

        println(absolutePath)

        Runtime.getRuntime().exec("cmd /c start \"\" $teste2");
 */


        println(teste);
        val proc = Runtime.getRuntime().exec("java -jar $teste")
        val givExplorer = AVisualizerToolWindow.getInstance(project)
        givExplorer.initializePanel(toolWindow)
    }
}