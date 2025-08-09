import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { useAuth } from '../App';
import { Appointment } from '../types';

export default function Dashboard() {
  const { setToken } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  const load = async () => {
    try {
      const data = await apiFetch('/appointments');
      setAppointments(data);
    } catch {
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch('/appointments', {
      method: 'POST',
      body: JSON.stringify({ title, description, dateTime })
    });
    setTitle(''); setDescription(''); setDateTime('');
    load();
  };

  const remove = async (id: number) => {
    await apiFetch(`/appointments/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h1>Meus agendamentos</h1>
      <form onSubmit={create}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
        <input value={dateTime} onChange={e => setDateTime(e.target.value)} type="datetime-local" required />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            {new Date(a.dateTime).toLocaleString()} - {a.title}
            <button onClick={() => remove(a.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
