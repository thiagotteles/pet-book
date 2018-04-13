import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, Animated, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Icon, Left, Body, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loggout } from '../../../actions/AuthActions';

HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 70
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40

class PerfilTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            activeIndex: 0
        }
    }

    segmentClicked = (index) => {
        this.setState({ activeIndex: index })
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View>
                    <Text>Grade</Text>
                </View>
            );
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const profileImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const profileMaginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp'
        })

        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT
                + 26
            ],
            outputRange: [-20, -20, -20, 0],
            extrapolate: 'clamp'
        })

        let urlPerfil = this.props.perfilLogado.imagem ? { uri: this.props.perfilLogado.imagem } : require('../../../assets/imgs/profile.png');

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    backgroundColor: '#fff',
                    left: 0,
                    right: 0,
                    backgroundColor: '#4068ad',
                    height: headerHeight,
                    zIndex: headerZindex,
                    alignItems: 'center',
                }}>
                    <Animated.View style={{ position: 'absolute', bottom: headerTitleBottom }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{this.props.perfilLogado.nome}</Text>
                    </Animated.View>
                </Animated.View>
                <ScrollView style={{ flex: 1 }}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
                >
                    <Animated.View style={{
                        height: profileImageHeight,
                        width: profileImageHeight,
                        backgroundColor: '#fff',
                        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                        borderColor: '#fff',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: profileMaginTop,
                        marginLeft: 10
                    }}>
                        <Image source={urlPerfil} 
                            style={{ flex: 1, width: null, height: null }}
                        />
                    </Animated.View>
                    <View style={{ backgroundColor: '#fff' }}><Text style={{ fontWeight: 'bold', fontSize: 26, paddingLeft: 13 }}>{this.props.perfilLogado.nome}</Text></View>
                    <View style={{ backgroundColor: '#fff', height: 1000 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Text>{this.props.perfilLogado.bio}</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>350</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>300</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Seguidores</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text>350</Text>
                                    <Text style={{ fontSize: 10, color: 'grey' }}>Seguindo</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>

                                <TouchableHighlight
                                    style={{
                                        flex: 4,
                                        height: 30,
                                        marginRight: 5,
                                        marginLeft: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 3,
                                        borderWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                    underlayColor="transparent"
                                    onPress={() => navigate('FormEditarPerfil')}>
                                    <Text style={{ color: 'grey' }} >Editar Perfil</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    style={{
                                        flex: 4,
                                        marginRight: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 3,
                                        borderWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                    onPress={() => this.props.loggout()}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="ios-information-circle-outline" style={{ fontSize: 20, color: 'grey', paddingRight: 5 }} />
                                        <Text style={{ color: 'grey', paddingRight: 5 }}>Informações</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    style={{
                                        flex: 1,
                                        marginRight: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 3,
                                        borderWidth: 1,
                                        borderColor: 'grey'
                                    }}
                                    onPress={() => this.props.loggout()}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="ios-exit-outline" style={{ fontSize: 20, color: 'grey', paddingRight: 5 }} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', marginTop: 10 }}>
                                    <Button transparent
                                        onPress={() => this.segmentClicked(0)}
                                        active={this.state.activeIndex == 0}>
                                        <Icon name="ios-apps-outline" style={[this.state.activeIndex == 0 ? {} : { color: 'grey' }]} />
                                    </Button>
                                    <Button transparent
                                        onPress={() => this.segmentClicked(1)}
                                        active={this.state.activeIndex == 1}>
                                        <Icon name="ios-list-outline" style={[this.state.activeIndex == 1 ? {} : { color: 'grey' }]} />
                                    </Button>
                                    <Button transparent
                                        onPress={() => this.segmentClicked(2)}
                                        active={this.state.activeIndex == 2}>
                                        <Icon name="ios-people-outline" style={[this.state.activeIndex == 2 ? {} : { color: 'grey' }]} />
                                    </Button>
                                    <Button transparent
                                        onPress={() => this.segmentClicked(3)}
                                        active={this.state.activeIndex == 3}>
                                        <Icon name="ios-bookmark-outline" style={[this.state.activeIndex == 3 ? {} : { color: 'grey' }]} />
                                    </Button>
                                </View>
                                {this.renderSection()}
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        usuarioLoagado: state.AutenticacaoReducer.usuarioLoagado,
        perfilLogado: state.AutenticacaoReducer.perfilLogado
    }
)

export default connect(mapStateToProps, { loggout })(PerfilTab)
