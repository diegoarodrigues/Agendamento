import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Event } from '../types'

type Props = { date: Date; events: Event[]; onSelect: (day: Date) => void }
export default function Calendar({ date, events, onSelect }: Props) {
  const days = eachDayOfInterval({ start: startOfMonth(date), end: endOfMonth(date) })
  return (
    <div className="grid grid-cols-7 gap-1 text-center">
      {days.map(d => {
        const count = events.filter(e => e.start.startsWith(format(d,'yyyy-MM-dd'))).length
        return (
          <button key={d.toISOString()} onClick={() => onSelect(d)} className="border p-2 hover:bg-gray-100">
            {format(d,'d', {locale: ptBR})}
            {count>0 && <div className="text-xs text-blue-500">{count} evt</div>}
          </button>
        )
      })}
    </div>
  )
}
