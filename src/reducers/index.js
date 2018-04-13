import { combineReducers } from 'redux';
import AutenticacaoReducer from './AuthReducer';
import AppReducer from './AppReducer';

export default combineReducers({
    AutenticacaoReducer: AutenticacaoReducer,
    AppReducer: AppReducer,
});