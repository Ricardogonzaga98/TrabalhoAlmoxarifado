import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LIMITE_BAIXO_ESTOQUE } from '../constants';

/**
 * Legenda visual explicando os indicadores de cor do estoque.
 */
export function Legenda() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.dot, { backgroundColor: '#22D3EE' }]} />
        <Text style={styles.texto}>Estoque normal</Text>
      </View>
      <View style={styles.separador} />
      <View style={styles.item}>
        <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
        <Text style={styles.texto}>Baixo estoque (≤ {LIMITE_BAIXO_ESTOQUE} un.)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  texto: {
    color: '#64748B',
    fontSize: 11,
  },
  separador: {
    width: 1,
    height: 12,
    backgroundColor: '#334155',
  },
});
