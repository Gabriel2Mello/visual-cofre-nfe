import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  showAlert: (message) => ipcRenderer.invoke('show-native-alert', message)
});
