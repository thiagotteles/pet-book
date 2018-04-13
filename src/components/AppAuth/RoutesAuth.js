import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import FormCadastro from './FormCadastro';
import FormLogin from './FormLogin';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#4068ad', height: 70, borderBottomColor: '#4068ad', elevation: 0 }}
        barButtonIconStyle={{ tintColor: 'white' }}
        tintColor='white'
        backButtonTextStyle={{ color: '#fff' }} >
        <Stack key="root">
            <Scene sceneStyle={{ backgroundColor: 'white' }} key='formLogin' component={FormLogin} title="Login" hideNavBar />
            <Scene key='formCadastro' component={FormCadastro} title=""/>
        </Stack>
    </Router>
);
