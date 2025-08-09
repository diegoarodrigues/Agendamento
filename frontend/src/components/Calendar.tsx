import { Event } from '../types';
import {
  monthDays,
  weekHours,
  startWeek,
  add,
  parse,
  fmt,
  sameDay,
} from '../lib/date';

type Props = {
  date: Date;
  view: 'month' | 'week' | 'day';
  events: Event[];
  onSelectSlot: (start: Date) => void;
  onSelectEvent: (e: Event) => void;
};

const pxPerMinute = 40 / 60; // cada hora 40px

export default function Calendar({
  date,
  view,
  events,
  onSelectSlot,
  onSelectEvent,
}: Props) {
  if (view === 'month') {
    const days = monthDays(date);
    return (
      <div className="grid grid-cols-7 text-xs border" role="grid">
        {days.map((d) => {
          const dayEvents = events.filter((e) => sameDay(parse(e.start), d));
          return (
            <div
              key={d.toISOString()}
              role="gridcell"
              tabIndex={0}
              className="h-24 border p-1 cursor-pointer focus:outline focus:outline-blue-500"
              onClick={() => onSelectSlot(new Date(d))}
            >
              <div
                className={`text-right ${sameDay(d, new Date()) ? 'font-bold text-blue-600' : ''}`}
              >
                {fmt(d, 'd')}
              </div>
              <div className="space-y-0.5 overflow-hidden">
                {dayEvents.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    className="truncate text-[10px] rounded px-1 text-white"
                    style={{ background: ev.color || '#3b82f6' }}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const days =
    view === 'week'
      ? Array.from({ length: 7 }, (_, i) => add.day(startWeek(date), i))
      : [date];

  return (
    <div
      className={`grid ${view === 'week' ? 'grid-cols-7' : 'grid-cols-1'} border`}
      role="grid"
    >
      {days.map((d) => {
        const dayEvents = events.filter((e) => sameDay(parse(e.start), d));
        return (
          <div
            key={d.toISOString()}
            className="relative border" role="gridcell"
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const minutes = ((e.clientY - rect.top) / pxPerMinute) | 0;
              const start = new Date(d);
              start.setHours(0, 0, 0, 0);
              start.setMinutes(Math.floor(minutes / 30) * 30);
              onSelectSlot(start);
            }}
          >
            {weekHours(d).map((h) => (
              <div
                key={h.toISOString()}
                className="h-10 border-b text-[10px] text-right pr-1"
              >
                {fmt(h, 'HH:mm')}
              </div>
            ))}
            {dayEvents.map((ev) => {
              const start = parse(ev.start);
              const end = parse(ev.end);
              const top = (start.getHours() * 60 + start.getMinutes()) * pxPerMinute;
              const height =
                ((end.getTime() - start.getTime()) / 60000) * pxPerMinute;
              const conflict = dayEvents.some(
                (o) =>
                  o.id !== ev.id &&
                  parse(o.start) < end &&
                  parse(o.end) > start
              );
              return (
                <div
                  key={ev.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(ev);
                  }}
                  className={`absolute left-0 right-0 m-0.5 rounded p-1 text-white text-xs overflow-hidden cursor-pointer ${
                    conflict ? 'border border-red-500' : ''
                  }`}
                  style={{
                    top,
                    height,
                    background: ev.color || '#3b82f6',
                  }}
                >
                  {ev.title}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
