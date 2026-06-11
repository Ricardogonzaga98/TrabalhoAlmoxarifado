import { API_BASE_URL, ENDPOINT_MATERIAIS } from '../constants';

/**
 * Busca todos os materiais do estoque via GET na MockAPI.
 * @returns {Promise<Array>} lista de materiais
 */
export async function getMateriais() {
  const response = await fetch(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar materiais: ${response.status}`);
  }
  return response.json();
}

/**
 * Cadastra um novo material no estoque via POST na MockAPI.
 * @param {{ nome: string, quantidade: number }} material
 * @returns {Promise<Object>} material criado com ID gerado pela API
 */
export async function postMaterial(material) {
  const response = await fetch(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  if (!response.ok) {
    throw new Error(`Erro ao cadastrar material: ${response.status}`);
  }
  return response.json();
}
