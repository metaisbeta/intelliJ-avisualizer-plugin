package org.metaisbeta.plugins.asniffer.services

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent


class AvisualizerService : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        print(e.project?.name)
    }

}