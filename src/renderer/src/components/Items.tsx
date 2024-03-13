import { ItemType } from '@renderer/App'
import Item from './Item'

interface ItemsProps {
  title: string
  items: ItemType[]
  onCheckOff: (item: ItemType) => void
}

function Items({ title, items, onCheckOff }: ItemsProps) {
  return (
    <section className="Items">
      <h2>{title}</h2>
      {items.map((item) => (
        <Item key={item.id} onCheckOff={() => onCheckOff(item)} {...item} />
      ))}
    </section>
  )
}

export default Items
