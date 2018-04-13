import React, { Component } from 'react';
import { Picker, Modal, SwipeableFlatList, View, ScrollView, Text, TextInput, Button, TouchableHighlight, Image, ImageBackground, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { Container, Header, Content, Icon, Body, Left, Right, Title } from 'native-base';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { salvarPerfil, salvarFotoPerfil } from '../../../actions/AuthActions';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'

const data = [
    {
        key: 'max',
        nome: 'Max',
        raca: 'Golden Retriever'
    },
    {
        key: 'vick',
        nome: 'Vick',
        raca: 'Golden Retriever'
    },
]

class FormEditarPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            bio: '',
            urlPerfil: '',
            loading: false,
            usuario: this.props.usuario,
            modalVisible: false,
            petNome: '',
            petGenero: 'Selecione o gênero do pet',
            petRaca: '',
            date: ""
        }
    }

    componentWillMount() {
        this.setState({ nome: this.props.perfilLogado.nome })
        this.setState({ bio: this.props.perfilLogado.bio })
        this.setState({ urlPerfil: this.props.perfilLogado.imagem })

    }

    _salvar() {
        this.props.salvarPerfil(this.props.usuario.email,
            this.state.nome,
            this.state.bio,
            decodeURI(this.state.urlPerfil.toString())
        );
        this.props.navigation.pop();
    }

    _changeNome(texto) {
        this.setState({ nome: texto })
    }

    _changeBio(texto) {
        this.setState({ bio: texto })
    }

    _changeImage() {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        //const { uid } = this.state.user
        const uid = this.props.usuario.email;
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
            cropperCircleOverlay: true
        }).then(image => {
            this.setState({ loading: true })

            const imagePath = image.path
            let uploadBlob = null
            const imageRef = firebase.storage().ref(uid).child("perfil.jpg")
            let mime = 'image/jpg'
            fs.readFile(imagePath, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob._ref, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    this.props.salvarFotoPerfil(uid, url)
                    this.setState({ urlPerfil: url })
                    this.setState({ loading: false })
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({ loading: false })
                })
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
            this.setState({ loading: false })
        });
    }

    _renderSalvar() {
        if (this.state.loading) {
            return (<ActivityIndicator />)
        }

        return (
            <TouchableHighlight underlayColor="transparent" onPress={() => this._salvar()}><Text style={{ color: '#fff', fontWeight: '800' }}>Salvar</Text></TouchableHighlight>
        )
    }

    _renderPerfil() {
        let imagemPerfil = this.state.urlPerfil ? { uri: this.state.urlPerfil } : require('../../../assets/imgs/profile.png');
        if (this.state.loading) {
            return (<ActivityIndicator />)
        }

        return (
            <Image source={imagemPerfil}
                style={{ flex: 1, width: null, height: null }}
            />
        )
    }

    _renderItemPet({ item }) {
        return (
            <View style={{ borderWidth: 0.5, borderColor: '#e8e8e8', flexDirection: 'row', height: 50, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: '#3f4046' }}>{item.nome}</Text>
                    <Text style={{ fontWeight: '300', color: '#3f4046' }}>{item.raca}</Text>
                </View>
            </View>
        )
    }

    _renderQuickActions({ item }) {
        return (

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableHighlight
                    style={[{ padding: 10, width: 50, backgroundColor: '#4068ad', justifyContent: 'center', alignItems: 'center' }, { backgroundColor: '#4068ad' }]}
                >
                    <Icon name='ios-create-outline' style={{ color: 'white' }} />
                </TouchableHighlight>
                <TouchableHighlight
                    style={[{ padding: 10, width: 50, backgroundColor: '#ef3038', justifyContent: 'center', alignItems: 'center' }, { backgroundColor: '#ef3038' }]}
                >
                    <Icon name='ios-trash-outline' style={{ color: 'white' }} />
                </TouchableHighlight>
            </View>

        )
    }

    _setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _changeNomePet(texto) {
        this.setState({ petNome: texto })
    }

    _changeRacaPet(texto) {
        this.setState({ petRaca: texto })
    }


    _changeGenero(index, value) {

        this.setState({
            petGenero: value,
        })
        return true;
    }


    render() {

        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={{ backgroundColor: '#4068ad', alignItems: 'center' }}>
                    <StatusBar backgroundColor="#4068ad" barStyle="light-content" />

                    <Left style={{ flex: 1 }}><TouchableHighlight underlayColor="transparent" onPress={() => this.props.navigation.pop()}><Text style={{ color: '#fff' }}>Cancelar</Text></TouchableHighlight></Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title style={{ textAlign: 'left', color: 'white' }}>Editar perfil</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>{this._renderSalvar()}</Right>
                </Header>
                <Body style={{ backgroundColor: 'white' }}>
                    <View style={{ backgroundColor: '#fcfcfc', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fcfcfc', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                            <View style={{
                                height: 100,
                                width: 100,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                borderColor: '#fff',
                                borderWidth: 3,
                                overflow: 'hidden',
                                marginTop: 10,
                                marginLeft: 10,
                            }}>
                                {this._renderPerfil()}
                            </View>
                            <TouchableHighlight style={{ marginBottom: 10 }} underlayColor="transparent" onPress={() => this._changeImage()}><Text style={{ color: '#0096ef' }}>Alterar foto do perfil</Text></TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderTopColor: '#e8e8e8', borderTopWidth: 1 }} >
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                <Text>Nome</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <TextInput value={this.props.nome}
                                    style={{
                                        backgroundColor: '#fff',
                                        height: 40
                                    }}
                                    underlineColorAndroid='transparent'
                                    keyboardType="ascii-capable"
                                    value={this.state.nome}
                                    placeholder='Nome do perfil do pet'
                                    onChangeText={texto => this._changeNome(texto)}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                <Text>Bio</Text>
                            </View>
                            <View style={{ flex: 3 }}>
                                <TextInput value={this.props.nome}
                                    style={{
                                        backgroundColor: '#fff',
                                        height: 40
                                    }}
                                    underlineColorAndroid='transparent'
                                    value={this.state.bio}
                                    placeholder='Uma breve descrição do perfil'
                                    onChangeText={texto => this._changeBio(texto)} />
                            </View>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ margin: 10, fontWeight: 'bold' }}>Pets</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <SwipeableFlatList
                            data={data}
                            bounceFirstRowOnMount={true}
                            maxSwipeDistance={100}
                            renderItem={this._renderItemPet.bind(this)}
                            renderQuickActions={this._renderQuickActions.bind(this)}
                        >
                        </SwipeableFlatList>
                    </View>
                    <View>
                        <TouchableHighlight style={{ marginTop: 10 }} underlayColor="transparent" onPress={() => {
                            this._setModalVisible(!this.state.modalVisible);
                        }}><Text style={{ color: '#0096ef' }}>+ Adicionar Pet</Text></TouchableHighlight>
                    </View>

                </Body>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View >
                        <Header style={{ backgroundColor: '#4068ad', alignItems: 'center' }}>
                            <Left style={{ flex: 1 }}><TouchableHighlight underlayColor="transparent" onPress={() => this._setModalVisible(!this.state.modalVisible)}><Text style={{ color: '#fff' }}>Cancelar</Text></TouchableHighlight></Left>
                            <Body style={{ flex: 1, alignItems: 'center' }}>
                                <Title style={{ textAlign: 'left', color: 'white' }}>Editar perfil</Title>
                            </Body>
                            <Right style={{ flex: 1 }}><TouchableHighlight underlayColor="transparent" onPress={() => this._setModalVisible(!this.state.modalVisible)}><Text style={{ color: '#fff', fontWeight: '800' }}>Salvar</Text></TouchableHighlight></Right>
                        </Header>
                        <View>

                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', borderTopColor: '#e8e8e8', borderTopWidth: 1 }} >
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                        <Text>Nome</Text>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            style={{
                                                backgroundColor: '#fff',
                                                height: 40
                                            }}
                                            underlineColorAndroid='transparent'
                                            keyboardType="ascii-capable"
                                            value={this.state.petNome}
                                            placeholder='Nome do pet'
                                            onChangeText={texto => this._changeNomePet(texto)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                        <Text>Gênero</Text>
                                    </View>
                                    <View style={{ flex: 3, height: 40, justifyContent: 'center' }}>
                                        <ModalDropdown defaultValue={this.state.petGenero}
                                            dropdownStyle={{
                                                flex: 1,
                                                width: 150,
                                                height: 73,
                                                flexDirection: 'row',
                                                borderColor: '#f6f6f6',
                                                borderWidth: 1,
                                                borderRadius: 3,
                                            }}

                                            onSelect={(index, value) => this._changeGenero(index, value)}
                                            options={['Macho', 'Fêmea']} />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                        <Text>Raça</Text>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <TextInput
                                            style={{
                                                backgroundColor: '#fff',
                                                height: 40
                                            }}
                                            underlineColorAndroid='transparent'
                                            keyboardType="ascii-capable"
                                            value={this.state.petRaca}
                                            placeholder='Raça do pet'
                                            onChangeText={texto => this._changeRacaPet(texto)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <View style={{ flex: 1, height: 40, justifyContent: 'center' }}>
                                        <Text>Nascimento</Text>
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <DatePicker

                                            date={this.state.date}
                                            mode="date"
                                            placeholder="Data de nascimento"
                                            format="DD/MM/YYYY"
                                            confirmBtnText="Selecionar"
                                            cancelBtnText="Cancelar"
                                            customStyles={{
                                                dateIcon: {
                                                    display: 'none',
                                                    right: 0
                                                },
                                                dateInput: {
                                                    borderWidth: 0,
                                                    height: 40,
                                                    left: 0
                                                },
                                                btnTextText: {
                                                    color: 'red'
                                                }
                                                // ... You can check the source to find the other keys.
                                            }}
                                            onDateChange={(date) => { this.setState({ date: date }) }}
                                        />
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                </Modal>
            </Container >

        );
    }
}

const mapStateToProps = state => (
    {
        usuario: state.AutenticacaoReducer.usuarioLoagado,
        perfilLogado: state.AutenticacaoReducer.perfilLogado,
    }
)

export default connect(mapStateToProps, { salvarPerfil, salvarFotoPerfil })(FormEditarPerfil)
