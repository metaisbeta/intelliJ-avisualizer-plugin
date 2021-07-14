package org.jetbrains.plugins.template

import com.github.phillima.asniffer.ASniffer
import com.github.phillima.asniffer.model.AMReport
import com.intellij.openapi.project.Project
import com.intellij.openapi.roots.ProjectRootManager
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*
import java.util.stream.Collectors


class WindowFactory : ToolWindowFactory {

    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {

        //TODO fix this part to get all project roots to run the ASniffer
        val projectName = project.name
        val vFiles: Array<VirtualFile> = ProjectRootManager.getInstance(project).getContentSourceRoots()
        val sourceRootsList: String = Arrays.stream(vFiles).map(VirtualFile::getUrl).collect(Collectors.joining("\n"))
        println("Source roots for the $projectName plugin:\n$sourceRootsList")

        // Run a java app in a separate system process
        //TODO fix this to run everywhere - Visualizer as JAR dependency.
        val teste = Paths.get("C:\\Users\\Sergio\\Documents\\Projetos\\TCC\\intelliJ-avisualizer-plugin\\libs\\avisualizer-back.jar").toString()
        Runtime.getRuntime().exec("java -jar $teste")
        val givExplorer = AVisualizerToolWindow.getInstance(project)
        givExplorer.initializePanel(toolWindow)
    }

    fun AnalyzeProject(projectPath: Path): AMReport? {
        //TODO Criar uma pasta dentro do intelij .asniffer com os projetos - testar.
        val reportPath = System.getProperty("user.dir") + ".asniffer"
        return ASniffer(projectPath.toString(), reportPath).collectSingle()
    }
}