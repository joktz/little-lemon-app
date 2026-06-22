import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Alert, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerScreen = () => {
    const [customer, onChangeCustomer] = React.useState('');

    return (
        <KeyboardAvoidingView>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Little Lemon Customers</Text>
                <TextInput 
                    value={customer}
                    onChangeText={onChangeCustomer}
                    placeholder={'Enter the customer name'}
                    style={styles.input}
                />
            </ScrollView>
        </KeyboardAvoidingView>
        
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
    },
    input: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        padding: 8,
        margin: 16,
        textAlign: 'center',
    }
})

export default CustomerScreen;