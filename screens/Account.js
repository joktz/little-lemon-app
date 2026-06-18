import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const AccountScreen = () => {
    // STATES
    const [push, setPush] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [news, setNews] = useState(false);

    // LOAD SAVED PREFERENCES
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const values = await AsyncStorage.multiGet([
                    'pushNotifications',
                    'emailNotifications',
                    'smsNotifications',
                ]);

                values.forEach(([key, value]) => {
                    if (value !== null) {
                        const parsedValue = JSON.parse(value);

                        if (key === 'pushNotifications') {
                            setPush(parsedValue);
                        }

                        if (key === 'emailNotifications') {
                            setMarketing(parsedValue);
                        }

                        if (key === 'smsNotifications') {
                            setNews(parsedValue);
                        }
                    }
                });
            } catch (e) {
                Alert.alert('Error', e.message)
            }
        }

        loadPreferences();
    }, []);


    // PERSISTENT ASYNC STORAGE

    const updatePreferences = async (userPreferences) => {
        try {
            const jsonValue = JSON.stringify(userPreferences)
            await AsyncStorage.multiSet([
                ['pushNotifications', JSON.stringify(userPreferences.push)],
                ['emailNotifications', JSON.stringify(userPreferences.marketing)],
                ['smsNotifications', JSON.stringify(userPreferences.news)],
            ]);
        } catch (e) {
            Alert.alert(`An error occurred: ${e.message}`)
        }
    }

    const handlePushChange = (value) => {
        setPush(value);
        updatePreferences({ push: value, marketing, news})
    }

    const handleMarketingChange = (value) => {
        setMarketing(value);
        updatePreferences({push, marketing: value, news})
    }

    const handleNewsChange = (value) => {
        setNews(value);
        updatePreferences({push, marketing, news: value})
    }

    // RETURNED SCREEN
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Preferences</Text>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Push notifications</Text>
                <Switch value={push} onValueChange={handlePushChange} />
            </View>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Marketing emails</Text>
                <Switch value={marketing} onValueChange={handleMarketingChange} />
            </View>
            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Latest news</Text>
                <Switch value={news} onValueChange={handleNewsChange} />
            </View>
        </View>
    )
};

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
});


export default AccountScreen;