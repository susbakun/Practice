import { ItemType } from '@shared/types'
import { openDB } from 'idb'

const database = openDB('jetsetter', 1, {
  upgrade(db) {
    db.createObjectStore('items', {
      keyPath: 'id',
      autoIncrement: true
    })
  }
})

export const getAll = async () => {
  const db = await database
  return await db.transaction('items').objectStore('items').getAll()
}

export const addItemToDB = async (item: Omit<ItemType, 'id'>) => {
  const db = await database
  const tx = db.transaction('items', 'readwrite')
  tx.objectStore('items').add(item)
  return tx.done
}

export const updateItem = async (item: ItemType) => {
  const db = await database
  const tx = db.transaction('items', 'readwrite')
  tx.objectStore('items').put(item)
  return tx.done
}

export const markAllAsUnpackedInDB = async () => {
  const items = await getAll()
  const newItems = items.map((item) => ({ ...item, packed: false }))
  const db = await database
  const tx = db.transaction('items', 'readwrite')
  for (const item of newItems) {
    tx.objectStore('items').put(item)
  }
  return await tx.done
}

export const deleteItemFromDB = async (item: ItemType) => {
  const db = await database
  const tx = db.transaction('items', 'readwrite')
  tx.objectStore('items').delete(item.id)
  return tx.done
}

export const deleteUnpackedItemsFromDB = async () => {
  const items = await getAll()
  const newItems = items.filter((item) => !item.packed)
  const db = await database
  const tx = db.transaction('items', 'readwrite')
  for (const item of newItems) {
    tx.objectStore('items').delete(item.id)
  }
  return tx.done
}
