import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient'; // Caminho corrigido

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao obter informações do usuário:', error.message);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};