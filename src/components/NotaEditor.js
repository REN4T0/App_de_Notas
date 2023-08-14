import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { adicionaNota, atualizaNota, removeNota } from "../services/Notas";

export default function NotaEditor({ showNotas, notaSel, setNotaSel }){
    const [categoria, setCategoria] = useState('Pessoal');
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [modalVisivel, setModalVisivel] = useState(false);
    const [atualizar, setAtualizar] = useState(false);

    async function salvaNota(){
        const nota = {
            titulo: titulo,
            categoria: categoria,
            texto: texto
        }
        await adicionaNota(nota);
        showNotas();
        limpaModal();
    }

    async function alteraNota(){
        const nota = {
            id: notaSel.id,
            titulo: titulo,
            categoria: categoria,
            texto: texto
        }
        await atualizaNota(nota);
        showNotas();
        limpaModal();
    }

    async function excluiNota(){
        await removeNota(notaSel.id);
        showNotas();
        limpaModal();
    }

    function preencheModal(){
        setTitulo(notaSel.titulo);
        setCategoria(notaSel.categoria);
        setTexto(notaSel.texto);
    }

    function limpaModal(){
        setTitulo('');
        setCategoria('Pessoal');
        setTexto('');
        setNotaSel({});
        setModalVisivel(false);
    }

    useEffect(() => {
        if(notaSel.id){
            preencheModal();
            setAtualizar(true);
            setModalVisivel(true);
            return;
        }
        setAtualizar(false);
    }, [notaSel]);

    return(
        <>
            <Modal animationType="slide" transparent={true} visible={modalVisivel} onRequestClose={() => {setModalVisivel(false)}}>
                <View style={estilos.centralizaModal}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={estilos.modal}>
                            <Text style={estilos.modalTitulo}>Criar Nota</Text>

                            <Text style={estilos.modalSubTitulo}>Título da Nota</Text>
                            <TextInput style={estilos.modalInput} onChangeText={value => setTitulo(value)} placeholder="Digite o Título" value={titulo} />
                            
                            <Text style={estilos.modalSubTitulo}>Categoria</Text>
                            <View style={estilos.modalPicker}>
                                <Picker selectedValue={categoria} onValueChange = {(itemValue) => setCategoria(itemValue)}>
                                    <Picker.Item label="Pessoal" value="Pessoal"/>
                                    <Picker.Item label="Trabalho" value="Trabalho"/>
                                    <Picker.Item label="Outros" value="Outros"/>
                                </Picker>
                            </View>

                            <Text style={estilos.modalSubTitulo}>Conteúdo da Nota</Text>
                            <TextInput style={estilos.modalInput} onChangeText={novoTexto => setTitulo(novoTexto)} placeholder="Digite o Título" numberOfLines={4} value={texto} />

                            <View style={estilos.modalBotoes}>
                                <TouchableOpacity style={estilos.botaoSalvar} onPress={() => atualizar ? alteraNota() : salvaNota()}>
                                    <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                                </TouchableOpacity>

                                {
                                    atualizar && (
                                        <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {excluiNota()}}>
                                            <Text style={estilos.modalBotaoTexto}>Excluir</Text>
                                        </TouchableOpacity>
                                    )
                                }

                                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {limpaModal()}}>
                                    <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <TouchableOpacity style={estilos.adicionaNota} onPress={() => {setModalVisivel(true)}}>
                <Text style={estilos.adicionaNotaTexto}>+</Text>
            </TouchableOpacity>
        </>
    )
}

const estilos = StyleSheet.create({
    centralizaModal:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    modal:{
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
        marginTop: 8,
        marginHorizontal: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },

    modalTitulo:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        
    },

    modalSubTitulo:{
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
    },

    modalInput:{
        fontSize: 18,
        marginBottom: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#ff9a04',
    },

    modalPicker:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#eee',
        marginBottom: 12,
    },

    modalBotoes:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    botaoSalvar:{
        backgroundColor: '#2ea805',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    modalBotaoDeletar:{
        backgroundColor: '#d62a18',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    modalBotaoCancelar:{
        backgroundColor: '#057fa8',
        borderRadius: 5,
        padding: 8,
        width: 80,
        alignItems: 'center',
    },

    modalBotaoTexto:{
        color: "#fff"
    },

    adicionaNota:{
        backgroundColor: '#54ba32',
        justifyContent: 'center',
        height: 65,
        width: 65,
        margin: 15,
        alignItems: 'center',
        borderRadius: 90,
        position: 'absolute',
        bottom: 0,
        right: 0,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },

    adicionaNotaTexto:{
        fontSize: 32,
        lineHeight: 40,
        color: '#fff',
    }

})