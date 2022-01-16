package org.metaisbeta.plugins.asniffer

import org.metaisbeta.plugins.asniffer.gcef.GBCefBrowser
import org.metaisbeta.plugins.asniffer.services.GivServiceSettings
import com.intellij.icons.AllIcons
import com.intellij.openapi.Disposable
import com.intellij.openapi.actionSystem.ActionManager
import com.intellij.openapi.actionSystem.ActionPlaces
import com.intellij.openapi.actionSystem.Constraints
import com.intellij.openapi.actionSystem.DefaultActionGroup
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.ui.SimpleToolWindowPanel
import com.intellij.ui.jcef.JBCefBrowser
import org.metaisbeta.plugins.asniffer.actions.*
import javax.swing.ImageIcon


@Suppress("UnstableApiUsage")
class GivMainPanel(private val initialUrl: String) : SimpleToolWindowPanel(true, true),
    Disposable {

    private val jbCefBrowser: JBCefBrowser = GBCefBrowser(initialUrl)
    private val visualizerURL = "https://avisualizer.vercel.app"

    init {
        toolbar =
            ActionManager.getInstance()
                .createActionToolbar(ActionPlaces.CONTEXT_TOOLBAR, buildToolbar(), true).component
        setContent(jbCefBrowser.component)

    }

    private fun buildToolbar(): DefaultActionGroup {
        val toolbar = DefaultActionGroup()
        val backButton = GBackAction(jbCefBrowser, ImageIcon(javaClass.getResource("/actions/back.png")))
        val forwardButton = GForwardAction(jbCefBrowser, ImageIcon(javaClass.getResource("/actions/forward.png")))
        val refreshButton = GRefreshAction(jbCefBrowser, ImageIcon(javaClass.getResource("/actions/refresh.png")))
        val homeButton = GHomeAction(jbCefBrowser, AllIcons.Nodes.HomeFolder)
        val bookMarkFavorites = GFavoritesMenuAction()

        val bus = ApplicationManager.getApplication().messageBus
        bus.connect().subscribe(SettingsChangedAction.TOPIC, object : SettingsChangedAction {
            override fun settingsChanged() {
                bookMarkFavorites.updateView(GivServiceSettings.instance(), jbCefBrowser)
                jbCefBrowser.loadURL(GivServiceSettings.instance().getLastSaveHomePage());
            }
        })

        bus.connect().subscribe(LoadingPageAction.LOADING_TOPIC, object : LoadingPageAction {
            override fun loadingPage() {
                jbCefBrowser.loadURL("$visualizerURL/loading")
            }
        })

        bus.connect().subscribe(ErrorPageAction.ERROR_TOPIC, object : ErrorPageAction {
            override fun errorPage() {
                jbCefBrowser.loadURL("$visualizerURL/error")
            }
        })

        val urlTextField = GSearchFieldAction(initialUrl, "Web address",
            ImageIcon(javaClass.getResource("/actions/refresh.png")),
            jbCefBrowser)


        jbCefBrowser.cefBrowser.client.addDisplayHandler(CefUrlChangeHandler { url -> urlTextField.setText(url ?: "") })

        toolbar.add(backButton)
        toolbar.add(forwardButton)
        toolbar.add(refreshButton)
        toolbar.add(homeButton)
        toolbar.add(bookMarkFavorites)
        toolbar.addSeparator()
        toolbar.add(urlTextField, Constraints.LAST)


        return toolbar
    }

    override fun dispose() {
        jbCefBrowser.dispose()
    }
}
