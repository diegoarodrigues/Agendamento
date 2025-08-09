import { useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import AgendaList from './components/AgendaList'
import EventForm from './components/EventForm'
import Toast from './components/Toast'
import { listEvents, saveEvent, deleteEvent } from './lib/api'
import { Event } from './types'

export default function App() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [editing, setEditing] = useState<Event | null>(null)
  const [toast, setToast] = useState('')

  const reload = async () => {
    try {
      const data = await listEvents()
      setEvents(data)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => { reload() }, [])

  const dayEvents = events.filter(e => e.start.startsWith(selectedDate.toISOString().slice(0,10)))

  return (
    <div className="p-4 space-y-4">
      <Calendar date={selectedDate} events={events} onSelect={d=>setSelectedDate(d)} />
      <button className="bg-blue-500 text-white px-2" onClick={()=>setEditing({start:new Date().toISOString(),end:new Date().toISOString(),title:''} as any)}>Novo</button>
      <AgendaList events={dayEvents} onEdit={e=>setEditing(e)} onDelete={async id=>{await deleteEvent(id); reload(); setToast('Excluído');}} />
      {editing && <EventForm initial={editing} onSave={async e=>{await saveEvent(e); reload(); setEditing(null); setToast('Salvo');}} onClose={()=>setEditing(null)} />}
      {toast && <Toast message={toast} onClose={()=>setToast('')} />}
    </div>
  )
}
