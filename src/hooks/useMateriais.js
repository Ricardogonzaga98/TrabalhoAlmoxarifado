import { useState, useEffect, useCallback } from 'react';
import { getMateriais } from '../services/api';

/**
 * Hook personalizado para buscar e gerenciar a lista de materiais do estoque.
 * Encapsula a chamada GET à MockAPI e os estados de loading/erro.
 */
export function useMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarMateriais = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await getMateriais();
      setMateriais(dados);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar materiais.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega os materiais automaticamente ao montar o componente
  useEffect(() => {
    buscarMateriais();
  }, [buscarMateriais]);

  return { materiais, loading, erro, recarregar: buscarMateriais };
}
