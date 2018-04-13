import React from 'react';
import { StackNavigator } from 'react-navigation';
import PerfilTab from './PerfilTab';
import FormEditarPerfil from './FormEditarPerfil';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

export default props => (
    <View style={{flex: 1}}>
        <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
        <PerfilNavigator />
    </View>
    
);

const PerfilNavigator = StackNavigator({
    Perfil: { screen: PerfilTab },
    FormEditarPerfil: { screen: FormEditarPerfil },
},
{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})
