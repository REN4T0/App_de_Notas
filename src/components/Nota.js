import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Nota({ item, setNotaSel }){
    
    const categorias = { Pessoal: '#ff924f', Outros: '#00911f', Trabalho: '#2f71eb' }
    const styles = StyleFunction(categorias[item.categoria])
    
    return(
        <TouchableOpacity style={styles.cartao} onPress={() => setNotaSel(item)}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>
            <Text style={styles.texto} numberOfLines={4}>{item.texto}</Text>
        </TouchableOpacity>
    )
}

const StyleFunction = (cor) => StyleSheet.create({
    cartao:{
        borderRadius: 5,
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 8,
        borderTopWidth: 5,
        borderColor: cor,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },

    titulo:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    categoria:{
        borderRadius: 4,
        backgroundColor: cor,
        padding: 4,
        color: '#fafafa',
        alignSelf: 'flex-start',
    },

    texto:{
        lineHeight: 28,
    }
})