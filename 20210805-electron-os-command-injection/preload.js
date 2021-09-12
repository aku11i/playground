console.log("preload");

const { ipcRenderer, contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld("electron", {
  createNewDirectory: (name) => {
    return ipcRenderer.invoke("CREATE_NEW_DIRECTORY", name);
  },
});
