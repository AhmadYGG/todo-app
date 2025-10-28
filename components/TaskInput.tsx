'use client'
import { useState } from 'react'

export default function TaskInput({ onAdd }: { onAdd: (text: string, tag?: string)=>void }){
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')

  const submit = (e?: any) => {
    if (e) e.preventDefault()
    if (!text.trim()) return
    onAdd(text, tag)
    setText('')
    setTag('')
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row gap-2"
    >
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        className="flex-1 bg-gray-700 placeholder-gray-400 rounded px-3 py-2 outline-none"
        placeholder="Add task e.g. 'Doing homework'"
      />
      <input
        value={tag}
        onChange={e => setTag(e.target.value)}
        className="sm:w-36 w-full bg-gray-700 placeholder-gray-400 rounded px-3 py-2 outline-none"
        placeholder="Tag (optional)"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-black rounded font-semibold w-full sm:w-auto"
      >
        Add
      </button>
    </form>
  )
}
