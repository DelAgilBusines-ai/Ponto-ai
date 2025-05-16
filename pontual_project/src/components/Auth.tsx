import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth: React.FC = () => {
  const [view, setView] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      alert('Login realizado com sucesso!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Registro realizado com sucesso! Verifique seu e-mail.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      alert('E-mail de redefinição de senha enviado!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {view === 'login' && (
        <div id="login">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
              Entrar
            </button>
          </form>
          <button onClick={() => setView('register')} className="text-blue-600 hover:underline">
            Não tem uma conta? Registre-se
          </button>
          <button onClick={() => setView('reset')} className="text-blue-600 hover:underline ml-4">
            Esqueceu a senha?
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      {view === 'register' && (
        <div id="register">
          <h2 className="text-2xl font-bold mb-4">Registro</h2>
          <form>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
              Registrar
            </button>
          </form>
          <button onClick={() => setView('login')} className="text-blue-600 hover:underline">
            Já tem uma conta? Faça login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      {view === 'reset' && (
        <div id="reset-password">
          <h2 className="text-2xl font-bold mb-4">Redefinir Senha</h2>
          <form>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" onClick={handleResetPassword}>
              Enviar e-mail de redefinição
            </button>
          </form>
          <button onClick={() => setView('login')} className="text-blue-600 hover:underline">
            Voltar para login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Auth;