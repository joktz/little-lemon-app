import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Alert, KeyboardAvoidingView, ScrollView, Pressable, TextInput, FlatList, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';



const CustomerScreen = () => {
    const [customer, onChangeCustomer] = React.useState('');
    const [customers, setCustomers] = React.useState([]);
    const [editingId, setEditingId] = React.useState(null);
    const [editText, setEditText] = React.useState('');

    // Update logging on customer list change
    useEffect(() => {
        console.log('Customer array updated', customers);
    }, [customers]);

    // Customer adding code
    const onSave = () => {
        console.log('Saving customer...');

        //DEBUG: Check current date
        console.log('Customers array:', customers);
        console.log('Input:', customer);

        // Iterate ID (TEMPORARY)
        const id = customers.length + 1
        console.log('Id to set:', id)

        const newCustomer = {
            id: id,
            name: customer
        };

        setCustomers([...customers, newCustomer]);
        onChangeCustomer('');
    };

    // Customer edit & delete code
    const editCustomer = (item) => {
        console.log('Editing customer...');
        // set editing id to open text input on card
        setEditingId(item.id);
        setEditText(item.name);
    }

    const saveEdit = () => {
        console.log('Saving edit...');

        const updatedCustomers = customers.map(customer => customer.id === editingId ? {...customer, name: editText } : customer );
        setCustomers(updatedCustomers);
        setEditingId(null);
        setEditText('');
    }

    const deleteCustomer = (id) => {
        if (Platform.OS == 'web') {
            const confirmed = window.confirm(
                'Are you sure you want to delete this customer?'
            );

            if (confirmed) {
                setCustomers(customers.filter(customer => customer.id !== id));
            }
        } else {
            Alert.alert(
                'Delete Customer',
                'Are you sure you want to delete this customer?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                            setCustomers(customers.filter(customer => customer.id !== id));
                        },
                    },
                ]
            );
        };

        console.log('Deleting customer:', id);
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Little Lemon Customers</Text>
                <TextInput 
                    value={customer}
                    onChangeText={onChangeCustomer}
                    placeholder={'Enter the customer name'}
                    style={styles.input}
                    onSubmitEditing={onSave}
                />
                <Pressable style={styles.button} onPress={() => onSave()}>
                    <Text style={styles.buttonText}>Save Customer</Text>
                </Pressable>
                <View style={styles.customerList}>
                    <Text style={styles.listText}>Customers:</Text>
                    <FlatList
                        data={customers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.customerCard}>
                                {editingId === item.id ? (
                                    <TextInput
                                        value={editText}
                                        onChangeText={setEditText}
                                        placeholder={'Enter the customer name'}
                                        style={styles.editInput}
                                        onSubmitEditing={saveEdit}
                                    />
                                ) : (
                                    <Text style={styles.listText}> {item.name} </Text>
                                )}
                                <View style={styles.iconContainer}>
                                    {editingId == item.id ? (
                                            <Pressable onPress={saveEdit}>
                                                <MaterialIcons name="edit" size={24} color="black" />
                                            </Pressable>
                                        ) : (
                                            <Pressable onPress={() => editCustomer(item)}>
                                                <MaterialIcons name="edit" size={24} color="black" />
                                            </Pressable> 
                                        )
                                    }
                                    

                                    <Pressable onPress={() => deleteCustomer(item.id)}>
                                        <MaterialIcons name="delete" size={24} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    />
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
        fontSize: 16,
    },
    customerList: {
        margin: 8,
    },
    listText: {
        fontSize: 16,
    },
    customerCard: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    editInput: {
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
    }
})

export default CustomerScreen;