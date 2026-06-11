import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente de cartão que exibe informações de um material do estoque.
 * @param {{ item: { nome: string, quantidade: number } }} props
 */
export function MaterialCard({ item }) {
  const baixoEstoque = Number(item.quantidade) <= 5;

  return (
    <View style={[styles.card, baixoEstoque && styles.cardAlerta]}>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.id}>#{item.id}</Text>
      </View>
      <View style={[styles.badge, baixoEstoque && styles.badgeAlerta]}>
        <Text style={styles.badgeTexto}>{item.quantidade}</Text>
        <Text style={styles.badgeLabel}>un.</Text>
      </View>
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
  cardAlerta: {
    borderLeftColor: '#F59E0B',
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
  id: {
    color: '#64748B',
    fontSize: 12,
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
});
