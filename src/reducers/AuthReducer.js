import * as constantes from '../actions/types'

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroLogin: '',
    loadingLogin: false,
    loadingCadastro: false,
    usuarioLoagado: null,
    perfilLogado: null
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case constantes.MODIFICA_EMAIL:
            return { ...state, email: action.payload }
            break;
        case constantes.MODIFICA_SENHA:
            return { ...state, senha: action.payload }
            break;
        case constantes.MODIFICA_NOME:
            return { ...state, nome: action.payload }
            break;
        case constantes.CADASTRO_USUARIO_ERRO:
            return { ...state, loadingCadastro: false, erroCadastro: action.payload }
            break;
        case constantes.CADASTRO_USUARIO_SUCESSO:
            return { ...state, erroCadastro: '', loadingCadastro: false, nome: '', senha: '' }
            break;
        case constantes.LOGIN_USUARIO_ERRO:
            return { ...state, loadingLogin: false, erroLogin: action.payload }
            break;
        case constantes.LOGIN_EM_ANDAMENTO:
            return { ...state, loadingLogin: true }
            break;
        case constantes.LOGIN_USUARIO_SUCESSO:
            return { ...state, loadingLogin: false }
            break;
        case constantes.CADASTRO_EM_ANDAMENTO:
            return { ...state, loadingCadastro: true }
            break;
        case constantes.AUTH_STATE_ALTERADO:
            return { ...state, usuarioLoagado: action.payload }
            break;
        case constantes.PERFIL_LOGADO_ALTERADO:
            return { ...state, perfilLogado: action.payload }
            break;
        case constantes.LOGGOUT_SUCESSO:
            return { ...state, usuarioLoagado: null }
            break;
        case constantes.PERFIL_SALVO_SUCESSO:
            return { ...state, perfilLogado: action.payload }
            break;
        default:
            return state;
    }
}