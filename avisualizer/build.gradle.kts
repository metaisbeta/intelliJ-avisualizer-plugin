plugins {
  // Gradle Node
  id("com.github.node-gradle.node") version "3.1.0"
}

node {
  version.set("14.17.5")
  npmVersion.set("")
  yarnVersion.set("")
  npmInstallCommand.set("install")
  distBaseUrl.set("https://nodejs.org/dist")
  download.set(false)
  workDir.set(file("${project.projectDir}/.cache/nodejs"))
  npmWorkDir.set(file("${project.projectDir}/.cache/npm"))
  yarnWorkDir.set(file("${project.projectDir}/.cache/yarn"))
  nodeProjectDir.set(file("${project.projectDir}"))
  nodeProxySettings.set(com.github.gradle.node.npm.proxy.ProxySettings.SMART)
}

tasks.npmInstall {
  nodeModulesOutputFilter {
    exclude("notExistingFile")
  }
}

tasks.create<com.github.gradle.node.task.NodeTask>("runNode") {
  dependsOn(tasks.npmInstall)
  workingDir.set(projectDir)
  script.set(file("app.js"))
}
