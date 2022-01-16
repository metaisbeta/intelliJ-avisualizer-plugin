package org.metaisbeta.plugins.asniffer;

import com.intellij.util.messages.Topic;

interface LoadingPageAction {

    fun loadingPage()

    companion object {
        val LOADING_TOPIC = Topic.create("Loading Page Topic", LoadingPageAction::class.java)
    }

}
