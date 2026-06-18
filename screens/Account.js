import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

const AccountScreen = () => {
    const [push, setPush] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [news, setNews] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Preferences</Text>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Push notifications</Text>
                <Switch value={push} onValueChange={setPush} />
            </View>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Marketing emails</Text>
                <Switch value={marketing} onValueChange={setMarketing} />
            </View>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Latest news</Text>
                <Switch value={news} onValueChange={setNews} />
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
        padding: 8,
        margin: 16
    },
    settingText: {
        fontSize: 24,
        alignItems: 'center',
    }
})

export default AccountScreen;