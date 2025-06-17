import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/services/supabaseClient';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Erro ao registrar usuário:', error.message);
        alert(error.message);
      } else if (data.user) {
        alert('Registro bem-sucedido! Verifique seu e-mail para confirmar a conta.');
        navigate('/'); // Redireciona para a página de login
      }
    } catch (err) {
      console.error('Erro inesperado ao registrar usuário:', err);
      alert('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <img
        src="/register-banner.png"
        alt="Banner de Registro"
        className="w-full max-w-4xl mx-auto mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mb-6">Registro</h1>
      <div className="bg-white p-4 shadow rounded">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
        <p className="mt-4 text-center">
          Já tem uma conta? <Link to="/" className="text-blue-500 hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
