import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Preferences</Text>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Push notifications</Text>
                <Switch />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
    },
    settingCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    settingText: {
        fontSize: 16,
        alignItems: 'center',
    }
})

export default AccountScreen;