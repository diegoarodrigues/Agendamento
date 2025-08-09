import { useEffect, useMemo, useState } from 'react';
import Calendar from './components/Calendar';
import AgendaList from './components/AgendaList';
import EventForm from './components/EventForm';
import { Event } from './types';
import { add, fmt, parse } from './lib/date';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [search, setSearch] = useState('');
  const [formDate, setFormDate] = useState<Date | null>(null);
  const [selected, setSelected] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);


  useEffect(() => {
    const timers = events
      .filter(e => e.remindMinutesBefore)
      .map(e => {
        const ms =
          new Date(e.start).getTime() -
          e.remindMinutesBefore! * 60000 -
          Date.now();
        if (ms > 0) {
          return setTimeout(() => {
            alert(`Lembrete: ${e.title} às ${fmt(parse(e.start), 'HH:mm')}`);
          }, ms);
        }
        return null;
      });
    return () => timers.forEach(t => t && clearTimeout(t));
  }, [events]);

  const filtered = useMemo(
    () =>
      events.filter((e) =>
        [e.title, e.description].some((t) =>
          t?.toLowerCase().includes(search.toLowerCase())
        )
      ),
    [events, search]
  );

  const handleSave = async (ev: Event) => {
    const exists = events.some((e) => e.id === ev.id);
    const url = exists ? `${API_URL}/events/${ev.id}` : `${API_URL}/events`;
    const res = await fetch(url, {
      method: exists ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
    });
    const saved = await res.json();
    setEvents((prev) => {
      const has = prev.find((p) => p.id === saved.id);
      return has ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved];
    });
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/events/${id}`, { method: 'DELETE' });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const onSelectSlot = (d: Date) => {
    setFormDate(d);
    setSelected(null);
  };

  const onSelectEvent = (e: Event) => {
    setSelected(e);
    setFormDate(parse(e.start));
  };

  const changeDate = (delta: number) => {
    const unit = view === 'month' ? 'month' : view === 'week' ? 'week' : 'day';
    setDate(add[unit](date, delta));
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex flex-wrap items-center gap-2">
        <button
          className="px-2 py-1 border" aria-label="Hoje"
          onClick={() => setDate(new Date())}
        >
          Hoje
        </button>
        <button
          className="px-2 py-1 border"
          aria-label="Anterior"
          onClick={() => changeDate(-1)}
        >
          ◀
        </button>
        <button
          className="px-2 py-1 border"
          aria-label="Próximo"
          onClick={() => changeDate(1)}
        >
          ▶
        </button>
        <div className="font-semibold flex-1">
          {view === 'month' && fmt(date, 'MMMM yyyy')}
          {view !== 'month' && fmt(date, 'PPP')}
        </div>
        <select
          aria-label="Selecione a visualização"
          className="border p-1"
          value={view}
          onChange={(e) => setView(e.target.value as any)}
        >
          <option value="month">Mensal</option>
          <option value="week">Semanal</option>
          <option value="day">Diária</option>
        </select>
        <input
          aria-label="Buscar"
          type="text"
          placeholder="Buscar"
          className="border p-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-3">
          <Calendar
            date={date}
            view={view}
            events={filtered}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
          />
        </div>
        <AgendaList date={date} events={filtered} onSelectEvent={onSelectEvent} />
      </div>
      {formDate && (
        <EventForm
          initialDate={formDate}
          event={selected}
          onClose={() => setFormDate(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
