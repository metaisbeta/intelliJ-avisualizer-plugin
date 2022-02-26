package org.metaisbeta.plugins.asniffer.services

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import org.jetbrains.concurrency.runAsync


class AsnifferServiceNotPersist : AnAction() {

    override fun actionPerformed(e: AnActionEvent) {
        runAsync {
            RunAsnifferNotPersist(e)
        }.onSuccess {

        }
    }

    fun RunAsnifferNotPersist(e: AnActionEvent) {

        try {
            if (e.project?.basePath != null) {
                ExecuteAsnifferAnalysis(e, false);
            }
        } catch (er: Exception){
            HandleError(e, er);
        }

    }

}