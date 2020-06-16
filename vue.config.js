module.exports = {
  pluginOptions: {
    electronBuilder: {
      // As of v2.0 of VCPEB, Electron nodeIntegration is disabled by default.
      // This blocks all node APIs such as require. This reduces security risks,
      // and is a recommended best practice by the Electron team. If you need to
      // use native modules such as fs or sqlite in the renderer process, you can
      // enable nodeIntegration in vue.config.js:
      nodeIntegration: true
    }
  }
}
