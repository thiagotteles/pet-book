import React from 'react';
import HomeTab from './HomeTab';
import PerfilForm from '../PerfilTab/PerfilTab';
import { StackNavigator } from 'react-navigation';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

export default props => (
    <View style={{flex: 1}}>
        <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
        <HomeNavigator />
    </View>
);

const HomeNavigator = StackNavigator({
    Home: { screen: HomeTab },
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    })
