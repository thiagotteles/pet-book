import React, { Component } from 'react';
import { Platform, StyleSheet, Text, ViewStatusBar, StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Icon } from 'native-base';
import { TabNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'firebase';

import HomeTab from './AppTabNavigator/HomeTab/index';
import ExplorarTab from './AppTabNavigator/ExplorarTab';
import AdoteTab from './AppTabNavigator/AdoteTab';
import NotificacoesTab from './AppTabNavigator/NotificacoesTab';
import PerfilTab from './AppTabNavigator/PerfilTab/index';
import MainAuth from './MainAuth';
import { assinarAuthState, perfilLogadoAlterado } from '../actions/AuthActions';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { usuario: this.props.usuario }
    }

    componentWillMount() {
        this.props.assinarAuthState();
        // firebase.auth().onAuthStateChanged((usuario) => {
        //     this.props.assinarAuthState(usuario);
        //     this.props.perfilLogadoAlterado(usuario);
        //     // NavigationActions.navigate({MainScreen})
        // })
    }

    static navigationOptions = {
        header: null
    }

    render() {
        if (!this.props.usuario || !this.props.perfilLogado) {
            return (
                <LoginNavigator />
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
                <AppTabNavigator />
            </View>
        );
    }
}

const LoginNavigator = StackNavigator({
    Auth: { screen: MainAuth },
    // Profile: { screen: ProfileScreen },
})

const AppTabNavigator = TabNavigator({
    HomeTab: {
        screen: HomeTab,
        key: 'homeTab'
    },
    ExplorarTab: {
        screen: ExplorarTab
    },
    AdoteTab: {
        screen: AdoteTab,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-paw" style={{ color: tintColor }} />
            )
        }
    },
    NotificacoesTab: {
        screen: NotificacoesTab
    },
    PerfilTab: {
        screen: PerfilTab,
    }

}, {
        initialRouteName: 'PerfilTab',
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#4068ad',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true
        },
    });


const mapStateToProps = state => (
    {
        usuario: state.AutenticacaoReducer.usuarioLoagado,
        perfilLogado: state.AutenticacaoReducer.perfilLogado,
    }
)

export default connect(mapStateToProps, { assinarAuthState, perfilLogadoAlterado })(MainScreen)
