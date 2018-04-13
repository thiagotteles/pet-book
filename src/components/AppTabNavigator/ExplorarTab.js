import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';

export default class ExplorarTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-search" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <Container>
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
