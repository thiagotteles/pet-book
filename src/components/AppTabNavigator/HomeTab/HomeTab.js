import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Icon, Left, Right, Body, Button, Title } from 'native-base';

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home-outline" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <Container>

                <Header style={{ backgroundColor: '#4068ad', alignItems: 'center' }}>
                    <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
                    <Left style={{ flex: 1 }}><Icon name="ios-chatbubbles-outline" style={{ color: 'white' }} /></Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title style={{ textAlign: 'left' }}>petbook</Title>
                    </Body>
                    <Right style={{ flex: 1 }}><Icon name="ios-paw-outline" style={{ color: 'white' }} /></Right>
                </Header>
                <Content>
                    <View >
                        <Text style={styles.welcome}>
                            Bem vindo a Home
                        </Text>
                        <Text style={styles.instructions}>
                            Aqui ficarão as postagens dos seus seguidores
                        </Text>
                        <Text style={styles.instructions}>
                        </Text>
                    </View>
                </Content>
            </Container>
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
