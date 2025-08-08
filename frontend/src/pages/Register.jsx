import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', form);
      setMessage('Cadastro realizado! Faça login.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erro');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={submit}>
        <input placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Senha" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Cadastrar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
