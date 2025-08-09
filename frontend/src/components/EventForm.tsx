import { useState } from 'react'
import { Event } from '../types'

type Props = { initial?: Partial<Event>; onSave: (e: Partial<Event>) => void; onClose: () => void }

export default function EventForm({ initial = {}, onSave, onClose }: Props) {
  const [title, setTitle] = useState(initial.title || '')
  const [start, setStart] = useState(initial.start || '')
  const [end, setEnd] = useState(initial.end || '')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form className="bg-white p-4 space-y-2" onSubmit={e => {e.preventDefault(); onSave({...initial,title,start,end});}}>
        <input className="border p-2 w-full" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" required />
        <input className="border p-2 w-full" type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} required />
        <input className="border p-2 w-full" type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} required />
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-2">Cancelar</button>
          <button type="submit" className="bg-blue-500 text-white px-2">Salvar</button>
        </div>
      </form>
    </div>
  )
}
