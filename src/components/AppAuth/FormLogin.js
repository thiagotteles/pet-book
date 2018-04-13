import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, Button, TouchableHighlight, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Icon } from 'native-base';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../../actions/AuthActions';

class FormLogin extends Component {
    _autenticarUsuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnAcessar() {
        if (this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large" />
            )
        }

        return (
            <TouchableHighlight
                underlayColor="transparent"
                style={{
                    backgroundColor: '#4068ad',
                    height: 40,
                    margin: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 3
                }}
                onPress={() => this._autenticarUsuario()}>
                <Text style={{ fontSize: 20, color: 'white' }}>Entrar</Text>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4068ad', justifyContent: 'center', alignContent: 'center' }}>
                <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 25,
                        fontWeight: 'bold',
                        backgroundColor: 'transparent'
                    }}>Petbook</Text>

                </View>
                <View style={{ flex: 3, backgroundColor: 'white', paddingTop: 10 }}>
                    <TextInput value={this.props.email}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        style={{
                            backgroundColor: '#fff',
                            fontSize: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 10,
                            borderTopLeftRadius: 3,
                            borderTopRightRadius: 3,
                            borderWidth: 1,
                            borderColor: '#C4C4C4',
                        }}
                        placeholder='E-mail'
                        onChangeText={texto => this.props.modificaEmail(texto)} />
                    <TextInput secureTextEntry
                        value={this.props.senha}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        style={{
                            backgroundColor: '#fff',
                            fontSize: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 1,
                            borderTopColor: 0,
                            borderColor: '#C4C4C4',
                            borderBottomLeftRadius: 3,
                            borderBottomRightRadius: 3,
                        }}
                        placeholder='Senha'
                        onChangeText={texto => this.props.modificaSenha(texto)} />
                    {this.renderBtnAcessar()}
                    <TouchableHighlight underlayColor="transparent" onPress={() => Actions.formCadastro()}>
                        <Text style={{
                            margin: 10,
                            color: 'grey'
                        }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(FormLogin)
