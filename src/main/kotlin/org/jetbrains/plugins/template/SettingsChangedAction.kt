package org.jetbrains.plugins.template

import com.intellij.util.messages.Topic

interface SettingsChangedAction {

    fun settingsChanged()

    companion object {
        val TOPIC = Topic.create("Setting Change Topic", SettingsChangedAction::class.java)
    }
}