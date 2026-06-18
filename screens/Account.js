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
                const keys = [
                    'pushNotifications',
                    'emailNotifications',
                    'smsNotifications',
                ];

                let values;

                if (AsyncStorage.multiGet) {
                    values = await AsyncStorage.multiGet(keys);
                } else {
                    values = await Promise.all(
                        keys.map(async (key) => [
                            key,
                            await AsyncStorage.getItem(key),
                        ])
                    );
                }

                console.log('Loaded preferences', values);

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
                Alert.alert('Error', e.message);
                console.log(`Error: ${e}`);
            }
        }

        loadPreferences();
    }, []);


    // PERSISTENT ASYNC STORAGE

    const updatePreferences = async (userPreferences) => {
        try {
            const pairs = [
                ['pushNotifications', JSON.stringify(userPreferences.push)],
                ['emailNotifications', JSON.stringify(userPreferences.marketing)],
                ['smsNotifications', JSON.stringify(userPreferences.news)],
            ];

            // Text platform (mobile or web)
            if (AsyncStorage.multiSet) {
                await AsyncStorage.multiSet(pairs);
            } else {
                await Promise.all(
                    pairs.map(([key, value]) => AsyncStorage.setItem(key, value))
                );
            }


            // Debugging
            let result;

            if (AsyncStorage.multiGet) {
                result = await AsyncStorage.multiGet([
                    'pushNotifications',
                    'emailNotifications',
                    'smsNotifications',
                ]);
            } else {
                result = await Promise.all(
                    pairs.map(async ([key]) => [
                        key,
                        await AsyncStorage.getItem(key),
                    ])
                );
            }

            console.log(result);
        } catch (e) {
            Alert.alert(`An error occurred: ${e.message}`);
            console.log(`Error: ${e}`);
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