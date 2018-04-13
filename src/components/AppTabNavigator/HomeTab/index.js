import React, { Component } from 'react';
import { Icon } from 'native-base';
import RoutesHome from './RoutesHome'
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home-outline" style={{ color: tintColor }} />
        )
    }
    render() {
        return (
            // <Text>HOme index </Text>
            <RoutesHome />
        );
    }
}