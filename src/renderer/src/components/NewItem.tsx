import { ItemType } from '@renderer/App'
import { ChangeEvent, FormEvent, useState } from 'react'

interface NewItemProps {
  onSubmit: (item: ItemType) => void
}

function NewItem({ onSubmit }: NewItemProps) {
  const [value, setValue] = useState('')

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ id: new Date().toString(), packed: false, value })
    setValue('')
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <input className="NewItem-input" type="text" value={value} onChange={handleUpdate} />
      <input className="NewItem-submit button" type="submit" />
    </form>
  )
}

export default NewItem
