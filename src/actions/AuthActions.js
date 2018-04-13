// import * as firebase from 'firebase';
// import * as firestore from 'firebase/firestore';
import b64 from 'base-64';
import * as constantes from './types';
import firebase from 'react-native-firebase';

export const modificaEmail = (texto) => {
    return {
        type: constantes.MODIFICA_EMAIL,// 'modifica_email',
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: constantes.MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: constantes.MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {
        dispatch({ type: constantes.CADASTRO_EM_ANDAMENTO });
        cadastroUsuarioSucesso(dispatch)

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                firebase.firestore().collection('perfis').doc(email.toLowerCase()).set({ nome })
                    .then(value => {
                        cadastroUsuarioSucesso(dispatch)
                    })
            })
            .catch(erro => {
                alert(erro);
                cadastroUsuarioErro(erro, dispatch)
            })
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({ type: constantes.CADASTRO_USUARIO_SUCESSO })
    // Actions.formLogin();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({ type: constantes.CADASTRO_USUARIO_ERRO, payload: erro.message });
}

export const autenticarUsuario = ({ email, senha }) => {
    return dispatch => {
        dispatch({ type: constantes.LOGIN_EM_ANDAMENTO });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => {
                loginUsuarioSucesso(dispatch);
            })
            .catch(erro => {
                alert(erro);
                loginUsuarioErro(erro, dispatch);
            });
    }
}

export const assinarAuthState = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario)
                firebase.firestore().collection('perfis').doc(usuario.email)
                    .onSnapshot((doc) => {
                        dispatch({ type: constantes.AUTH_STATE_ALTERADO, payload: usuario })
                        dispatch({ type: constantes.PERFIL_LOGADO_ALTERADO, payload: doc.data() })
                    })
            else {
                dispatch({ type: constantes.AUTH_STATE_ALTERADO, payload: null })
                dispatch({ type: constantes.PERFIL_LOGADO_ALTERADO, payload: null })
            }
        })
    }
}

export const perfilLogadoAlterado = (usuario) => {

    return dispatch => {
        firebase.firestore().collection('perfis').doc(usuario.email)
            .onSnapshot((doc) => {
                dispatch({ type: constantes.PERFIL_LOGADO_ALTERADO, payload: doc.data() })
            })
    }
}

const loginUsuarioSucesso = (dispatch) => {
    dispatch({ type: constantes.LOGIN_USUARIO_SUCESSO })
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch({ type: constantes.LOGIN_USUARIO_ERRO, payload: erro.message });
}

export const loggout = () => {
    return dispatch => {
        firebase.auth().signOut()
            .then(value => {
                dispatch({ type: constantes.LOGGOUT_SUCESSO });
            })
            .catch(erro => {
                alert(erro);
            });
    }
}

export const salvarPerfil = (email, nome, bio, imagem) => {    
    return dispatch => {

        firebase.firestore().collection('perfis')
            .doc(email).update({
                nome: nome,
                bio: bio
            })
            .then((value) => {
                console.log('salvou', value)
                dispatch({ type: constantes.PERFIL_SALVO_SUCESSO, payload: perfil })
            })
            .catch((e) => {
                console.log('nao salvou', e)
            })
    }
}

export const salvarFotoPerfil = (email, imagem) => {    
    return dispatch => {

        firebase.firestore().collection('perfis')
            .doc(email).update({
                imagem: imagem
            })
            .then((value) => {
                console.log('salvou', value)
                // dispatch({ type: constantes.PERFIL_SALVO_SUCESSO, payload: perfil })
            })
            .catch((e) => {
                console.log('nao salvou', e)
            })
    }
}