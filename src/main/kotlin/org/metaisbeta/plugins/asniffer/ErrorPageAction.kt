package org.metaisbeta.plugins.asniffer;

import com.intellij.util.messages.Topic;

interface ErrorPageAction {

    fun errorPage()

    companion object {
        val ERROR_TOPIC = Topic.create("Error Page Topic", ErrorPageAction::class.java)
    }

}
