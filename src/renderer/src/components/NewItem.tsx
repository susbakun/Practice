import { ItemType } from '@renderer/App'
import { ChangeEvent, FormEvent, useState } from 'react'

interface NewItemProps {
  onSubmit: (item: Omit<ItemType, 'id'>) => void
}

function NewItem({ onSubmit }: NewItemProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ value, packed: false })
    setValue('')
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <input type="text" className="NewItem-input" value={value} onChange={handleChange} />
      <input type="submit" className="NewItem-submit button" />
    </form>
  )
}

export default NewItem
