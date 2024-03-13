interface ItemProps {
  packed: boolean
  value: string
  onCheckOff: () => void
}

function Item({ packed, value, onCheckOff }: ItemProps) {
  return (
    <article className="Item">
      <label>
        <input type="checkbox" checked={packed} onChange={onCheckOff} />
        {value}
      </label>
    </article>
  )
}

export default Item
