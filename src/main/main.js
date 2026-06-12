import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { optimizer, is } from '@electron-toolkit/utils'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    return result.filePaths[0]
  })

  ipcMain.handle('save-file', async (_, { folderPath, fileName, content }) => {
    const fullPath = join(folderPath, fileName)

    writeFileSync(fullPath, content, 'utf-8')
    return true
  })

  ipcMain.handle('show-native-alert', async (event, message) => {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    dialog.showMessageBoxSync(focusedWindow, {
      type: 'error', // Can be 'none', 'info', 'warning', 'error'
      title: 'Alerta',
      message: message,
      buttons: ['OK']
    })

    return true;
  })

  createWindow()
})

