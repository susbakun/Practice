import { contextBridge, ipcRenderer } from 'electron'
import { ItemType } from '../shared/types'

contextBridge.exposeInMainWorld('context', {
  fetchItems: () => ipcRenderer.invoke('fetchItems'),
  addItem: (item: Omit<ItemType, 'id'>) => ipcRenderer.invoke('addItem', item),
  updateItem: (item: ItemType) => ipcRenderer.invoke('updateItem', item),
  markAllAsUnpacked: () => ipcRenderer.invoke('markAllAsUnpacked'),
  deleteItem: (item: ItemType) => ipcRenderer.invoke('deleteItem', item),
  deleteUnpackedItems: () => ipcRenderer.invoke('deleteUnpackedItems')
})
