import { API_BASE_URL, ENDPOINT_MATERIAIS } from '../constants';

async function fetchSeguro(url, opcoes) {
  try {
    const response = await fetch(url, opcoes);
    if (!response.ok) {
      throw new Error(`Erro do servidor: ${response.status}`);
    }
    return response;
  } catch (erro) {
    if (erro.message.includes('Network request failed') || erro.message.includes('Failed to fetch')) {
      throw new Error('Sem conexão com a internet. Verifique sua rede e tente novamente.');
    }
    throw erro;
  }
}

export async function getMateriais() {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`);
  return response.json();
}

export async function postMaterial(material) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  return response.json();
}

export async function putMaterial(id, dados) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return response.json();
}

export async function deleteMaterial(id) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}/${id}`, {
    method: 'DELETE',
  });
  try {
    await response.json();
  } catch (_) {
    // MockAPI pode retornar sem corpo em DELETE.
  }
}
