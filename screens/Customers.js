import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>LIttle Lemon Customers</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
    }
})

export default CustomerScreen;