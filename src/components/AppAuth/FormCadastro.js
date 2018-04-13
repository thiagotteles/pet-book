import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableHighlight, ImageBackground, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { Container, Header, Content, Icon, Body, Left, Right } from 'native-base';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { modificaEmail, modificaSenha, cadastraUsuario, modificaNome } from '../../actions/AuthActions';

class formCadastro extends Component {
    cadastrarUsuario() {
        const { nome, email, senha } = this.props;
        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastrar() {
        if (this.props.loadingCadastro) {
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
                onPress={() => this.cadastrarUsuario()}>
                <Text style={{ fontSize: 20, color: 'white' }}>Cadastrar</Text>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#4068ad', justifyContent: 'center', alignContent: 'center' }}>
                <StatusBar backgroundColor="#4068ad" barStyle="light-content" />
                <View style={{ height: 120, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 25,
                        fontWeight: 'bold',
                        backgroundColor: 'transparent'
                    }}>Petbook</Text>

                </View>
                <View style={{ flex: 3, backgroundColor: 'white', paddingTop: 10 }}>
                    <TextInput value={this.props.nome}
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
                        placeholder='Nome do perfil do pet'
                        onChangeText={texto => this.props.modificaNome(texto)} />
                    <TextInput value={this.props.email}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                        style={{
                            backgroundColor: '#fff',
                            fontSize: 20,
                            height: 45,
                            marginLeft: 10,
                            marginRight: 10,
                            borderTopWidth: 0,
                            borderTopColor: 'white',
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
                            borderTopWidth: 0,
                            borderColor: '#C4C4C4',
                            borderBottomLeftRadius: 3,
                            borderBottomRightRadius: 3,
                        }}
                        placeholder='Senha'
                        onChangeText={texto => this.props.modificaSenha(texto)} />
                    {this.renderBtnCadastrar()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, cadastraUsuario, modificaNome })(formCadastro)
