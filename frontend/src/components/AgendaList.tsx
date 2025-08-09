import { Event } from '../types'
import { fmt } from '../lib/date'

type Props = { events: Event[]; onEdit?: (e: Event) => void; onDelete?: (id: string) => void }
export default function AgendaList({ events, onEdit, onDelete }: Props) {
  return (
    <ul className="divide-y">
      {events.map(e => (
        <li key={e.id} className="p-2 flex justify-between items-center" style={{borderLeft: e.hasConflict ? '4px solid red' : undefined}}>
          <div>
            <div className="font-semibold">{e.title}</div>
            <div className="text-sm">{fmt(e.start,'HH:mm')} - {fmt(e.end,'HH:mm')}</div>
          </div>
          <div className="space-x-2">
            {onEdit && <button onClick={()=>onEdit(e)} className="text-blue-500">Editar</button>}
            {onDelete && <button onClick={()=>onDelete(e.id)} className="text-red-500">Excluir</button>}
          </div>
        </li>
      ))}
    </ul>
  )
}
