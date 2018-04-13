import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import RoutesAuth from './AppAuth/RoutesAuth';

import FormLogin from './AppAuth/FormLogin';
import FormCadastro from './AppAuth/FormCadastro';

export default class MainAuth extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <RoutesAuth />
        );
    }
}