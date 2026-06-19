import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { MaterialCard } from './MaterialCard';

/**
 * Componente que exibe a lista de materiais em estoque.
 * Utiliza FlatList com testID="lista-materiais" conforme contrato técnico.
 *
 * @param {{ materiais: Array, loading: boolean, erro: string|null, onRecarregar: () => void }} props
 */
export function ListaEstoque({ materiais, loading, erro, onRecarregar, onEditar, onExcluir }) {
  if (loading) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#22D3EE" />
        <Text style={styles.textoSecundario}>Carregando estoque...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoErro}>⚠️ {erro}</Text>
        <TouchableOpacity style={styles.btnRecarregar} onPress={onRecarregar}>
          <Text style={styles.btnRecarregarTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      testID="lista-materiais"
      data={materiais}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <MaterialCard
          item={item}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRecarregar}
          tintColor="#22D3EE"
          colors={['#22D3EE']}
        />
      }
      contentContainerStyle={
        materiais.length === 0 ? styles.listaVazia : styles.lista
      }
      ListEmptyComponent={
        <View style={styles.centrado}>
          <Text style={styles.iconeVazio}>📦</Text>
          <Text style={styles.textoVazio}>Nenhum material cadastrado.</Text>
          <Text style={styles.textoSecundario}>
            Use o formulário acima para adicionar o primeiro item.
          </Text>
        </View>
      }
      ListHeaderComponent={
        materiais.length > 0 ? (
          <Text style={styles.cabecalho}>
            {materiais.length} {materiais.length === 1 ? 'item' : 'itens'} em estoque
          </Text>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 24,
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  textoSecundario: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  textoErro: {
    color: '#F87171',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  btnRecarregar: {
    borderWidth: 1,
    borderColor: '#22D3EE',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnRecarregarTexto: {
    color: '#22D3EE',
    fontWeight: '600',
  },
  iconeVazio: {
    fontSize: 48,
    marginBottom: 12,
  },
  textoVazio: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  cabecalho: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
});
