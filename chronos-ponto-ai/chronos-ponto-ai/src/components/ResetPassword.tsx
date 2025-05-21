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
      <div>
        <h1>Redefinir Senha</h1>
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword} disabled={loading}>
          {loading ? 'Redefinindo...' : 'Redefinir Senha'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Solicitar Redefinição de Senha</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendResetEmail} disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar e-mail de redefinição'}
      </button>
    </div>
  );
};

export default ResetPassword;