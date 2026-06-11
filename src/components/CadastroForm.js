import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { postMaterial } from '../services/api';

/**
 * Formulário de cadastro de novos materiais.
 * Após sucesso no POST, chama onCadastroSucesso para atualizar a lista.
 *
 * @param {{ onCadastroSucesso: () => void }} props
 */
export function CadastroForm({ onCadastroSucesso }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [salvando, setSalvando] = useState(false);

  const limparFormulario = () => {
    setNome('');
    setQuantidade('');
  };

  const handleCadastrar = async () => {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome do material.');
      return;
    }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      Alert.alert('Campo inválido', 'Informe uma quantidade válida.');
      return;
    }

    setSalvando(true);
    try {
      await postMaterial({ nome: nome.trim(), quantidade: Number(quantidade) });
      limparFormulario();
      onCadastroSucesso();
      Alert.alert('Sucesso!', 'Material cadastrado no estoque.');
    } catch (e) {
      Alert.alert('Erro', e.message || 'Não foi possível cadastrar o material.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Material</Text>

      <Text style={styles.label}>Nome do Material</Text>
      <TextInput
        testID="input-nome"
        style={styles.input}
        placeholder="Ex: Papel A4, Caneta azul..."
        placeholderTextColor="#475569"
        value={nome}
        onChangeText={setNome}
        autoCorrect={false}
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        testID="input-quantidade"
        style={styles.input}
        placeholder="Ex: 100"
        placeholderTextColor="#475569"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        returnKeyType="done"
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={[styles.botao, salvando && styles.botaoDesativado]}
        onPress={handleCadastrar}
        disabled={salvando}
        activeOpacity={0.8}
      >
        {salvando ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  titulo: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F1F5F9',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  botao: {
    backgroundColor: '#22D3EE',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoDesativado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
