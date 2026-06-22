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
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Save Customer</Text>
                </Pressable>
                <View style={styles.customerList}>
                    <Text style={styles.listText}>Customers:</Text>
                </View>
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
        fontSize: 16,
    },
    button: {
        backgroundColor: 'green',
        padding: 16,
        alignItems: 'center',
        margin: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: '16',
    },
    customerList: {
        margin: 8,
    },
    listText: {
        fontSize: 16,
    }
})

export default CustomerScreen;