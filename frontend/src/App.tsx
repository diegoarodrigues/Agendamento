import { createContext, useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AuthContext = createContext<{ token: string | null; setToken: (t: string | null) => void }>({ token: null, setToken: () => {} });
export const useAuth = () => useContext(AuthContext);

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}
