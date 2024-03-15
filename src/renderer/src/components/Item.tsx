interface ItemProps {
  value: string
  packed: boolean
  onCheckOff(): void
  onDelete(): void
}

function Item({ value, packed, onCheckOff, onDelete }: ItemProps) {
  return (
    <article className="Item">
      <label>
        <input type="checkbox" checked={packed} onChange={onCheckOff} />
        {value}
      </label>
      <button className="delete" onClick={onDelete}>
        ❌
      </button>
    </article>
  )
}

export default Item
