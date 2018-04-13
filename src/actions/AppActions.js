import firebase from 'firebase';
import firestore from 'firebase/firestore';
import b64 from 'base-64';
import * as constantes from './types';

// export const salvarPerfil = (email, perfil) => {
//     return dispatch => {
//         firebase.firestore().collection('perfis')
//             .doc(email).set(perfil)
//             .then((value) => {
//                 dispatch({ type: constantes.PERFIL_SALVO_SUCESSO, payload: perfil })
//             })
//     }
// }