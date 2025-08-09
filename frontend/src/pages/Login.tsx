import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../api';
import { useAuth } from '../App';

export default function Login() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('token', res.token);
      setToken(res.token);
      navigate('/');
    } catch (err) {
      setError('Falha no login');
    }
  };

  return (
    <form onSubmit={submit}>
      <h1>Entrar</h1>
      {error && <p>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Login</button>
      <p>
        <Link to="/register">Cadastrar</Link>
      </p>
    </form>
  );
}
