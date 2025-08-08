import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dateTime: '' });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await axios.get('/appointments');
    setAppointments(res.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`/appointments/${editingId}`, form);
    } else {
      await axios.post('/appointments', form);
    }
    setForm({ title: '', description: '', dateTime: '' });
    setEditingId(null);
    fetchAppointments();
  };

  const edit = (a) => {
    setForm({ title: a.title, description: a.description || '', dateTime: a.dateTime.slice(0,16) });
    setEditingId(a.id);
  };

  const remove = async (id) => {
    await axios.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  return (
    <div>
      <h2>Agendamentos</h2>
      <form onSubmit={submit}>
        <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="datetime-local" value={form.dateTime} onChange={e => setForm({ ...form, dateTime: e.target.value })} />
        <button type="submit">{editingId ? 'Salvar' : 'Criar'}</button>
      </form>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            <b>{a.title}</b> {new Date(a.dateTime).toLocaleString()}
            <button onClick={() => edit(a)}>Editar</button>
            <button onClick={() => remove(a.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
