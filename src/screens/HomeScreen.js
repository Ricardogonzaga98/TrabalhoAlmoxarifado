import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CadastroForm } from '../components/CadastroForm';
import { ListaEstoque } from '../components/ListaEstoque';
import { Legenda } from '../components/Legenda';
import { useMateriais } from '../hooks/useMateriais';

export function HomeScreen() {
  const {
    materiais,
    loading,
    erro,
    recarregar,
    editarMaterial,
    deletarMaterial,
  } = useMateriais();

  const [busca, setBusca] = useState('');

  const materiaisFiltrados = useMemo(() => {
    if (!busca.trim()) return materiais;
    const termo = busca.toLowerCase().trim();
    return materiais.filter((m) => m.nome.toLowerCase().includes(termo));
  }, [materiais, busca]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.headerIcone}>🏭</Text>
          <View>
            <Text style={styles.headerTitulo}>Almoxarifado</Text>
            <Text style={styles.headerSubtitulo}>Controle de Estoque</Text>
          </View>
        </View>

        <CadastroForm onCadastroSucesso={recarregar} />

        <View style={styles.divisor} />

        <View style={styles.buscaContainer}>
          <TextInput
            testID="input-busca"
            accessibilityLabel="Pesquisar material"
            style={styles.inputBusca}
            placeholder="Pesquisar material..."
            placeholderTextColor="#475569"
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
          />
          <Text testID="total-itens" style={styles.totalItens}>
            {materiaisFiltrados.length}{' '}
            {materiaisFiltrados.length === 1 ? 'item' : 'itens'}
          </Text>
        </View>

        <Legenda />

        <ListaEstoque
          materiais={materiaisFiltrados}
          loading={loading}
          erro={erro}
          onRecarregar={recarregar}
          onEditar={editarMaterial}
          onExcluir={deletarMaterial}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 12,
  },
  headerIcone: {
    fontSize: 32,
  },
  headerTitulo: {
    color: '#F1F5F9',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitulo: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  divisor: {
    height: 1,
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  buscaContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  inputBusca: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F1F5F9',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  totalItens: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'right',
  },
});
