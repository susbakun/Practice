import { useState } from 'react'
import Items from './components/Items'
import NewItem from './components/NewItem'

export interface ItemType {
  id: string
  value: string
  packed: boolean
}

function App(): JSX.Element {
  const [items, setItems] = useState<ItemType[]>([{ id: '1', packed: false, value: 'Shoes' }])

  const unpackedItems = items.filter((item) => !item.packed)
  const packedItems = items.filter((item) => item.packed)

  const addItem = (item: ItemType) => {
    setItems((prevItems) => [...prevItems, item])
  }

  const markAsPacked = (item: ItemType) => {
    const otherItems = items.filter((other) => other.id !== item.id)
    const updatedItem = { ...item, packed: !item.packed }
    setItems([updatedItem, ...otherItems])
  }

  const markAllAsUnPacked = () => {
    const Items = items.map((item) => ({ ...item, packed: false }))
    setItems(Items)
  }

  return (
    <div className="Application">
      <NewItem onSubmit={addItem} />
      <Items title="Unpacked Items" items={unpackedItems} onCheckOff={markAsPacked} />
      <Items title="Packed Items" items={packedItems} onCheckOff={markAllAsUnPacked} />
      <button className="full-width" onClick={markAllAsUnPacked}>
        Mark All As Unpacked
      </button>
    </div>
  )
}

export default App
