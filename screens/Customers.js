import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Pressable,
    TextInput,
    FlatList,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'little_lemon_customers';

const loadCustomers = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
};

const saveCustomers = async (customers) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
};

const CustomerScreen = () => {
    const [customer, onChangeCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        loadCustomers().then(setCustomers);
    }, []);

    const updateCustomers = (updated) => {
        setCustomers(updated);
        saveCustomers(updated);
    };

    const onSave = () => {
        if (!customer.trim()) return;
        const newCustomer = { id: Date.now(), name: customer };
        updateCustomers([...customers, newCustomer]);
        onChangeCustomer('');
    };

    const editCustomer = (item) => {
        setEditingId(item.id);
        setEditText(item.name);
    };

    const saveEdit = () => {
        const updated = customers.map((c) =>
        c.id === editingId ? { ...c, name: editText } : c
        );
        updateCustomers(updated);
        setEditingId(null);
        setEditText('');
    };

    const deleteCustomer = (id) => {
        const doDelete = () =>
        updateCustomers(customers.filter((c) => c.id !== id));

        if (Platform.OS === 'web') {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            doDelete();
        }
        } else {
        Alert.alert(
            'Delete Customer',
            'Are you sure you want to delete this customer?',
            [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: doDelete },
            ]
        );
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Little Lemon Customers</Text>
            <TextInput
            value={customer}
            onChangeText={onChangeCustomer}
            placeholder="Enter the customer name"
            style={styles.input}
            onSubmitEditing={onSave}
            />
            <Pressable style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save Customer</Text>
            </Pressable>
            <View style={styles.customerList}>
            <Text style={styles.listText}>Customers:</Text>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                <View style={styles.customerCard}>
                    {editingId === item.id ? (
                    <TextInput
                        value={editText}
                        onChangeText={setEditText}
                        placeholder="Enter the customer name"
                        style={styles.editInput}
                        onSubmitEditing={saveEdit}
                    />
                    ) : (
                    <Text style={styles.listText}>{item.name}</Text>
                    )}
                    <View style={styles.iconContainer}>
                    <Pressable
                        onPress={editingId === item.id ? saveEdit : () => editCustomer(item)}>
                        <MaterialIcons name="edit" size={24} color="black" />
                    </Pressable>
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
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
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
    buttonText: { color: 'white', fontSize: 16 },
    customerList: { margin: 8 },
    listText: { fontSize: 16 },
    customerCard: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: { flexDirection: 'row' },
    editInput: {
        flex: 1,
        height: 40,
        borderColor: 'green',
        borderWidth: 1,
        padding: 8,
        textAlign: 'center',
    },
});

export default CustomerScreen;