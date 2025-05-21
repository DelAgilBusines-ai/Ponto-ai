export const fetchAIResponse = async (query: string): Promise<string> => {
    try {
      // Simulação de chamada à API de IA
      console.log(`Enviando consulta para IA: ${query}`);
      // Retorna uma resposta simulada
      return `Resposta simulada para a consulta: "${query}"`;
    } catch (error) {
      console.error('Erro ao consultar a API de IA:', error);
      throw new Error('Erro ao consultar a API de IA.');
    }
  };

