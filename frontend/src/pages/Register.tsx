import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      navigate('/login');
    } catch {
      setError('Falha no cadastro');
    }
  };

  return (
    <form onSubmit={submit}>
      <h1>Cadastrar</h1>
      {error && <p>{error}</p>}
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Registrar</button>
      <p><Link to="/login">Voltar</Link></p>
    </form>
  );
}
