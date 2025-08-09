import { Event } from '../types'

const base = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function listEvents(): Promise<Event[]> {
  const res = await fetch(`${base}/api/events`)
  return await res.json()
}

export async function saveEvent(ev: Partial<Event>): Promise<Event> {
  const res = await fetch(`${base}/api/events${ev.id ? '/' + ev.id : ''}`, {
    method: ev.id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ev)
  })
  return await res.json()
}

export async function deleteEvent(id: string) {
  await fetch(`${base}/api/events/${id}`, { method: 'DELETE' })
}
