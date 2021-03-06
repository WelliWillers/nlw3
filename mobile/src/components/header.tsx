import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeadeProps {
    title: string;
    showCanel?: boolean;
}

export default function Header({title, showCanel = true}: HeadeProps) {
    const navigation = useNavigation();

    function handleGoBackToHomePage(){
        navigation.navigate('OrphanagesMap');
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
            {showCanel ? (
                <BorderlessButton onPress={handleGoBackToHomePage}>
                    <Feather name="x" size={24} color="#ff669d" />
                </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderColor: "#ddd",
        borderBottomWidth: 1,
        paddingTop: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    }
})