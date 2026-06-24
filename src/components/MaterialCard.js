import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LIMITE_ESTOQUE_CRITICO } from '../constants';

/**
 * Componente de cartão que exibe informações de um material do estoque.
 * Permite editar e excluir itens do inventário.
 * @param {{ item: { id: string, nome: string, quantidade: number }, onEditar: Function, onExcluir: Function }} props
 */
export function MaterialCard({ item, onEditar, onExcluir }) {
  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState(item.nome);
  const [quantidade, setQuantidade] = useState(String(item.quantidade));

  useEffect(() => {
    setNome(item.nome);
    setQuantidade(String(item.quantidade));
  }, [item.nome, item.quantidade]);

  const estoqueCritico = Number(item.quantidade) < LIMITE_ESTOQUE_CRITICO;

  const handleSalvar = () => {
    const nomeTrim = nome.trim();
    const quantidadeNumero = Number(quantidade);

    if (!nomeTrim) {
      Alert.alert('Erro', 'O nome do material não pode ficar em branco.');
      return;
    }

    if (!quantidade || quantidadeNumero <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida maior que zero.');
      return;
    }

    onEditar(item.id, { nome: nomeTrim, quantidade: quantidadeNumero });
    setEditMode(false);
  };

  const handleExcluir = () => {
    Alert.alert(
      'Confirmação',
      `Deseja excluir o material "${item.nome}" do estoque?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(item.id) },
      ]
    );
  };

  return (
    <View
      style={[styles.card, estoqueCritico && styles.cardCritico]}
      accessibilityLabel={estoqueCritico ? 'estoque-critico' : undefined}
    >
      <View style={styles.info}>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do material"
              placeholderTextColor="#94A3B8"
              testID={`input-editar-nome-${item.id}`}
            />
            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={(value) => setQuantidade(value.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              placeholder="Quantidade"
              placeholderTextColor="#94A3B8"
              testID={`input-editar-quantidade-${item.id}`}
            />
          </>
        ) : (
          <>
            <Text style={styles.nome}>{item.nome}</Text>
            <View style={styles.meta}>
              <Text style={styles.id}>#{item.id}</Text>
              {estoqueCritico && <Text style={styles.alerta}>Estoque crítico</Text>}
            </View>
          </>
        )}
      </View>

      {editMode ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditMode(false)}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rightColumn}>
          <View style={[styles.badge, estoqueCritico && styles.badgeAlerta]}>
            <Text style={styles.badgeTexto}>{item.quantidade}</Text>
            <Text style={styles.badgeLabel}>un.</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditMode(true)}
              testID="btn-editar"
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={handleExcluir}
              testID="btn-excluir"
            >
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#22D3EE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardCritico: {
    backgroundColor: '#3B1A1A',
    borderLeftColor: '#EF4444',
  },
  info: {
    flex: 1,
  },
  nome: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  id: {
    color: '#64748B',
    fontSize: 12,
  },
  alerta: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    minWidth: 160,
  },
  badge: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 56,
  },
  badgeAlerta: {
    backgroundColor: '#78350F',
  },
  badgeTexto: {
    color: '#22D3EE',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  badgeLabel: {
    color: '#64748B',
    fontSize: 10,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  actionsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#22D3EE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  cancelText: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
});
