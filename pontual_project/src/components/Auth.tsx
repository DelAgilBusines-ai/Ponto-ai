import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Erro ao fazer login:', error.message);
        alert(error.message);
      } else if (data.user) {
        console.log('Login bem-sucedido:', data.user);
        navigate('/dashboard'); // Redireciona para o dashboard após login
      }
    } catch (err) {
      console.error('Erro inesperado ao fazer login:', err);
      alert('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Carregando...' : 'Login'}
      </button>
      <p>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
      <p>
        <Link to="/reset-password">Esqueceu a senha?</Link>
      </p>
    </div>
  );
};

export default Auth;
