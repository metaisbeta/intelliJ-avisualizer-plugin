package org.jetbrains.plugins.template

import com.intellij.openapi.Disposable
import com.intellij.openapi.ui.SimpleToolWindowPanel
import com.intellij.ui.IdeBorderFactory
import com.intellij.ui.SideBorder
import com.intellij.ui.jcef.JBCefBrowser
import com.intellij.ui.layout.panel
import com.intellij.util.ui.UIUtil
import java.awt.BorderLayout
import javax.swing.JPanel
import javax.swing.JTextField

@Suppress("UnstableApiUsage")
class MainPanel : SimpleToolWindowPanel(true, true), Disposable {

    //private val URL = "https://avisualizer.herokuapp.com/"
    private val URL = "http://localhost:8080"

    init {
        initGivPanel()
    }

    private fun initGivPanel() {
        val jbCefBrowser = JBCefBrowser(URL)
        val divPanel = JPanel(BorderLayout())
        divPanel.border = IdeBorderFactory.createBorder(UIUtil.getBoundsColor(), SideBorder.ALL)
        divPanel.add(jbCefBrowser.component, BorderLayout.CENTER)
        setContent(divPanel)

        val myUrlBar = JTextField(URL)
        val panel = panel {
            row { myUrlBar() }
        }

        myUrlBar.addActionListener { jbCefBrowser.loadURL(myUrlBar.text) }
        divPanel.add(panel, BorderLayout.NORTH)
    }

    override fun dispose() {}
}