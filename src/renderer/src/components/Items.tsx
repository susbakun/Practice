import { ItemType } from '@shared/types'
import Item from './Item'

interface ItemsProps {
  title: string
  items: ItemType[]
  onCheckOff: (item: ItemType) => void
  onDelete: (item: ItemType) => void
}

function Items({ title, items, onCheckOff, onDelete }: ItemsProps) {
  return (
    <section className="Items">
      <h2>{title}</h2>
      {items.map((item) => (
        <Item
          key={item.id}
          onDelete={() => onDelete(item)}
          onCheckOff={() => onCheckOff(item)}
          {...item}
        />
      ))}
    </section>
  )
}

export default Items
