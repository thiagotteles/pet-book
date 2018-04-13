import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import MainScreen from './src/components/MainScreen';
import MainAuth from './src/components/MainAuth';


const AppStackNavigator = StackNavigator({
    Main: { screen: MainScreen }
})

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAn-riWDgSaRUXIYAUjaV21M8EUHjoOHoI",
            authDomain: "tagworks-petbook.firebaseapp.com",
            databaseURL: "https://tagworks-petbook.firebaseio.com",
            projectId: "tagworks-petbook",
            storageBucket: "tagworks-petbook.appspot.com",
            messagingSenderId: "435055076998"
        };
        firebase.initializeApp(config);
    }

    render() {
        // alert(JSON.stringify(this.state.usuario))
        // if (!this.state.usuario)
        //     return (
        //         <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        //             <LoginNavigator />
        //         </Provider>
        //     );
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <AppStackNavigator />
            </Provider>
        );
    }
}