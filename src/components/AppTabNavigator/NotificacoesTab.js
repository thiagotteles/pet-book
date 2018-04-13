import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';

export default class NotificacoesTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-notifications-outline" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Bem vindo a Notificacoes
                </Text>
                <Text style={styles.instructions}>
                    Aqui é aonde vc encontra tudo que estao falando de voce
                </Text>
                <Text style={styles.instructions}>
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
