import React from 'react';
import {
  View,
  Text,
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

/**
 * Tela principal do aplicativo de Almoxarifado.
 * Combina o formulário de cadastro com a lista de estoque.
 */
export function HomeScreen() {
  const {
    materiais,
    loading,
    erro,
    recarregar,
    editarMaterial,
    deletarMaterial,
  } = useMateriais();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerIcone}>🏭</Text>
          <View>
            <Text style={styles.headerTitulo}>Almoxarifado</Text>
            <Text style={styles.headerSubtitulo}>Controle de Estoque</Text>
          </View>
        </View>

        {/* Formulário de cadastro */}
        <CadastroForm onCadastroSucesso={recarregar} />

        {/* Divisor */}
        <View style={styles.divisor} />

        {/* Legenda de cores */}
        <Legenda />

        {/* Lista de materiais */}
        <ListaEstoque
          materiais={materiais}
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
});
