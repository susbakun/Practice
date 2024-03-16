import { useEffect, useState } from 'react'
import Items from './components/Items'
import NewItem from './components/NewItem'
import { ItemType } from '@shared/types'
import {
  addItemToDB,
  deleteItemFromDB,
  deleteUnpackedItemsFromDB,
  getAll,
  markAllAsUnpackedInDB,
  updateItem
} from './database'

function App() {
  const [items, setItems] = useState<ItemType[]>([])
  const packedItems = items.filter((item) => item.packed)
  const unpackedItems = items.filter((item) => !item.packed)

  const addItem = async (item: Omit<ItemType, 'id'>) => {
    try {
      await addItemToDB(item)
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  const markAsPacked = async (item: ItemType) => {
    try {
      await updateItem(item)
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  const markAllAsUnpacked = async () => {
    try {
      await markAllAsUnpackedInDB()
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  const fetchItems = async () => {
    try {
      const Items = await getAll()
      setItems(Items)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteItem = async (item: ItemType) => {
    try {
      await deleteItemFromDB(item)
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUnpackedItems = async () => {
    try {
      await deleteUnpackedItemsFromDB()
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="Application">
      <NewItem onSubmit={addItem} />
      <Items
        title="Unpacked Items"
        items={unpackedItems}
        onCheckOff={markAsPacked}
        onDelete={deleteItem}
      />
      <Items
        title="Packed Items"
        items={packedItems}
        onCheckOff={markAsPacked}
        onDelete={deleteItem}
      />
      <button className="full-width" onClick={markAllAsUnpacked}>
        Mark All As Unpacked
      </button>
      <button className="button full-width secondary" onClick={deleteUnpackedItems}>
        Remove Unpacked Items
      </button>
    </div>
  )
}

export default App
