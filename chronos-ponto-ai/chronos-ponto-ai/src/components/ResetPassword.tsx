import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      setIsResetMode(true);
    }
  }, []);

  const handleSendResetEmail = async () => {
    if (!email) {
      alert('Por favor, insira seu e-mail.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        console.error('Erro ao enviar e-mail de redefinição:', error.message);
        alert(error.message);
      } else {
        alert('E-mail de redefinição enviado. Verifique sua caixa de entrada.');
      }
    } catch (err) {
      console.error('Erro inesperado ao enviar e-mail de redefinição:', err);
      alert('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        console.error('Erro ao redefinir senha:', error.message);
        alert(error.message);
      } else {
        alert('Senha redefinida com sucesso. Você pode fazer login agora.');
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Erro inesperado ao redefinir senha:', err);
      alert('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (isResetMode) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <img
          src="/reset-password-banner.png"
          alt="Banner de Redefinição de Senha"
          className="w-full max-w-4xl mx-auto mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-bold mb-6">Redefinir Senha</h1>
        <div className="bg-white p-4 shadow rounded">
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {loading ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <img
        src="/reset-password-banner.png"
        alt="Banner de Solicitação de Redefinição de Senha"
        className="w-full max-w-4xl mx-auto mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-3xl font-bold mb-6">Solicitar Redefinição de Senha</h1>
      <div className="bg-white p-4 shadow rounded">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSendResetEmail}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? 'Enviando...' : 'Enviar e-mail de redefinição'}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;