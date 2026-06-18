import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const AccountScreen = () => {
    return (
        <View>
            <Text style={styles.header}>Account Preferences</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontStyle: 'bold',
        textAlign: 'center'
    }
})

export default AccountScreen;