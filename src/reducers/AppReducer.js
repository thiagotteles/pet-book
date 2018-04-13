import * as constantes from '../actions/types'

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case constantes.PERFIL_SALVO_SUCESSO:
        //     return { ...state, email: action.payload }
        //     break;
        default:
            return state;
    }
}