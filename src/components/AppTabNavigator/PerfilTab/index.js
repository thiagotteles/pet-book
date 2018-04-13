import React, { Component } from 'react';
import { Icon } from 'native-base';
import RoutesPerfil from './RoutesPerfil'

export default class PerfilTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            <RoutesPerfil />
        );
    }
}