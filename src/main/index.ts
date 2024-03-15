import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import database from './database'
import { ItemType } from '../shared/types'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 450,
    minWidth: 300,
    minHeight: 300,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: true
    }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

const fetchItems = async () => {
  try {
    const Items = await database('items').select()
    return Items
  } catch (err) {
    console.error(err)
  }
}

const addItem = async (_event: any, item: Omit<ItemType, 'id'>) => {
  try {
    await database('items').insert(item)
    return await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

const updateItem = async (_event: any, item: ItemType) => {
  try {
    await database('items').where('id', item.id).update({
      packed: !item.packed
    })
    return await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

const markAllAsUnpacked = async () => {
  try {
    await database('items').where('packed', true).update({ packed: false })
    return await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

const deleteItem = async (_event: any, item: ItemType) => {
  try {
    await database('items').where('id', item.id).delete()
    return await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

const deleteUnpackedItems = async () => {
  try {
    await database('items').where('packed', false).delete()
    return await fetchItems()
  } catch (err) {
    console.error(err)
  }
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.handle('fetchItems', fetchItems)
  ipcMain.handle('addItem', addItem)
  ipcMain.handle('updateItem', updateItem)
  ipcMain.handle('markAllAsUnpacked', markAllAsUnpacked)
  ipcMain.handle('deleteItem', deleteItem)
  ipcMain.handle('deleteUnpackedItems', deleteUnpackedItems)

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
