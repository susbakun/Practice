import { useEffect, useState } from 'react'
import Items from './components/Items'
import NewItem from './components/NewItem'
import { ItemType } from '@shared/types'

function App() {
  const [items, setItems] = useState<ItemType[]>([])
  const packedItems = items.filter((item) => item.packed)
  const unpackedItems = items.filter((item) => !item.packed)

  const addItem = async (item: Omit<ItemType, 'id'>) => {
    const newItems = await window.context.addItem(item)
    setItems(newItems)
  }

  const markAsPacked = async (item: ItemType) => {
    const Items = await window.context.updateItem(item)
    setItems(Items)
  }

  const markAllAsUnpacked = async () => {
    const Items = await window.context.markAllAsUnpacked()
    setItems(Items)
  }

  const fetchItems = async () => {
    const Items = await window.context.fetchItems()
    setItems(Items)
  }

  const deleteItem = async (item: ItemType) => {
    const Items = await window.context.deleteItem(item)
    setItems(Items)
  }

  const deleteUnpackedItems = async () => {
    const Items = await window.context.deleteUnpackedItems()
    setItems(Items)
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
