import { ElectronAPI } from '@electron-toolkit/preload'
import { ItemType } from '@renderer/App'

declare global {
  interface Window {
    context: {
      fetchItems: () => Promise<ItemType[]>
      addItem: (item: OMit<ItemType, 'id'>) => Promise<ItemType[]>
      updateItem: (item: ItemType) => Promise<ItemType[]>
      markAllAsUnpacked: () => Promise<ItemType[]>
      deleteItem: (item: ItemType) => Promise<ItemType[]>
      deleteUnpackedItems: () => Promise<ItemType[]>
    }
  }
}
