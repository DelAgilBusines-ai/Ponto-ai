import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Caminho corrigido

interface Point {
  id: string;
  timestamp: string;
  description: string;
}

const Points: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchPoints = async () => {
    const { data, error } = await supabase
      .from('points')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setPoints(data || []);
    }
  };

  const addPoint = async () => {
    setError(null);
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error('Usuário não autenticado.');

      const { error } = await supabase
        .from('points')
        .insert([{ user_id: user.id, description }]);

      if (error) throw error;

      setDescription('');
      fetchPoints(); // Atualiza a lista de pontos
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Meus Pontos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPoint();
        }}
        className="mb-4"
      >
        <input
          type="text"
          placeholder="Descrição do ponto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Adicionar Ponto
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {points.map((point) => (
          <li key={point.id} className="border-b py-2">
            <p>{point.description}</p>
            <small>{new Date(point.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Points;