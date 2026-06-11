// Serviço responsável pela comunicação com a MockAPI
// Substitua a BASE_URL pela URL gerada no seu projeto MockAPI.io
const BASE_URL = 'https://SEU_ID.mockapi.io/api/v1';

/**
 * Busca todos os materiais do estoque
 * @returns {Promise<Array>} lista de materiais
 */
export async function getMateriais() {
  const response = await fetch(`${BASE_URL}/materiais`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar materiais: ${response.status}`);
  }
  return response.json();
}

/**
 * Cadastra um novo material no estoque
 * @param {{ nome: string, quantidade: number }} material
 * @returns {Promise<Object>} material criado
 */
export async function postMaterial(material) {
  const response = await fetch(`${BASE_URL}/materiais`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  if (!response.ok) {
    throw new Error(`Erro ao cadastrar material: ${response.status}`);
  }
  return response.json();
}
