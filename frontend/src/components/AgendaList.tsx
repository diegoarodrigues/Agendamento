import { Event } from '../types';
import { fmt, parse, sameDay } from '../lib/date';

type Props = {
  date: Date;
  events: Event[];
  onSelectEvent: (e: Event) => void;
};

export default function AgendaList({ date, events, onSelectEvent }: Props) {
  const dayEvents = events
    .filter((e) => sameDay(parse(e.start), date))
    .sort((a, b) => parse(a.start).getTime() - parse(b.start).getTime());
  return (
    <div>
      <h2 className="font-semibold mb-2">Agenda</h2>
      <ul className="space-y-1">
        {dayEvents.map((ev) => (
          <li
            key={ev.id}
            className="p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectEvent(ev)}
            style={{ borderLeft: `4px solid ${ev.color || '#3b82f6'}` }}
          >
            <div className="text-sm">{ev.title}</div>
            <div className="text-xs text-gray-500">
              {fmt(parse(ev.start), 'HH:mm')} - {fmt(parse(ev.end), 'HH:mm')}
            </div>
          </li>
        ))}
        {dayEvents.length === 0 && (
          <li className="text-sm text-gray-500">Sem eventos</li>
        )}
      </ul>
    </div>
  );
}
