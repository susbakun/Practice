import { BrowserWindow, app } from 'electron'
import { is } from '@electron-toolkit/utils'
import path from 'path'

function createWindow(): void {
  const newWindow = new BrowserWindow({
    width: 400,
    height: 400,
    minWidth: 300,
    minHeight: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js')
    }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    newWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  }

  newWindow.once('ready-to-show', () => {
    newWindow.show()
  })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
