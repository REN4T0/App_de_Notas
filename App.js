import { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, FlatList, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import NotaEditor from './src/components/NotaEditor';
import Nota       from './src/components/Nota';
import { buscaNotas, criaTabela } from './src/services/Notas';

export default function App(){

  const [notas, setNotas]         = useState([]);
  const [notaSel, setNotaSel]     = useState({});
  const [categoria, setCategoria] = useState('*');

  useEffect(() => {
    criaTabela();
  }, []);

  useEffect(() => {
    async function inicNotas(){
      await mostraNotas();
    }
    inicNotas();
  }, [categoria]);

  async function mostraNotas(){
    const xxx = await buscaNotas(categoria);
    setNotas(xxx);
  }

  return(
    <SafeAreaView style = {estilos.container}>
      <View style = {estilos.modalPicker}>
        <Picker selectedValue={categoria}
                onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item Label = 'Notas'    value = '*' />
          <Picker.Item Label = 'Pessoal'  value = 'Pessoal' />
          <Picker.Item Label = 'Trabalho' value = 'Trabalho' />
          <Picker.Item Label = 'Outros'   value = 'Outros' />
        </Picker>
      </View>

      <FlatList data = {notas} renderItem={(nota) => (
          <Nota item = {nota.item} setNotaSel = {setNotaSel} />
        )}
        keyExtractor={(nota) => nota.id}
      />

      <NotaEditor showNotas = {mostraNotas} 
                  notaSel = {notaSel} 
                  setNotaSel = {setNotaSel} 
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#eee',
    margin: 10,
  }
})