import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom useUpdate hook
// Runs when dependencies update, but skips the initial mount
const useUpdate = (callback, dependencies) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        callback();
    }, dependencies);
};

const AccountScreen = () => {
    // STATES
    const [preferences, setPreferences] = useState({
        pushNotifications: false,
        emailNotifications: false,
        smsNotifications: false,
    });

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

                console.log('Loaded preferences:', values);

                const loadedPreferences = {};

                values.forEach(([key, value]) => {
                    if (value !== null) {
                        loadedPreferences[key] = value === 'true';
                    }
                });

                setPreferences((currentPreferences) => ({
                    ...currentPreferences,
                    ...loadedPreferences,
                }));
            } catch (e) {
                Alert.alert('Error', e.message);
                console.log(`Error: ${e}`);
            }
        };

        loadPreferences();
    }, []);

    // PERSISTENT ASYNC STORAGE
    // This effect only runs when the preferences state updates,
    // excluding initial mount
    useUpdate(() => {
        const savePreferences = async () => {
            try {
                const keyValues = Object.entries(preferences).map(
                    ([key, value]) => [key, String(value)]
                );

                if (AsyncStorage.multiSet) {
                    await AsyncStorage.multiSet(keyValues);
                } else {
                    await Promise.all(
                        keyValues.map(([key, value]) =>
                            AsyncStorage.setItem(key, value)
                        )
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
                        keyValues.map(async ([key]) => [
                            key,
                            await AsyncStorage.getItem(key),
                        ])
                    );
                }

                console.log('Saved preferences:', result);
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
                console.log(`Error: ${e}`);
            }
        };

        savePreferences();
    }, [preferences]);

    const handlePushChange = (value) => {
        setPreferences((currentPreferences) => ({
            ...currentPreferences,
            pushNotifications: value,
        }));
    };

    const handleMarketingChange = (value) => {
        setPreferences((currentPreferences) => ({
            ...currentPreferences,
            emailNotifications: value,
        }));
    };

    const handleNewsChange = (value) => {
        setPreferences((currentPreferences) => ({
            ...currentPreferences,
            smsNotifications: value,
        }));
    };

    // RETURNED SCREEN
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Preferences</Text>

            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Push notifications</Text>
                <Switch
                    value={preferences.pushNotifications}
                    onValueChange={handlePushChange}
                />
            </View>

            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Marketing emails</Text>
                <Switch
                    value={preferences.emailNotifications}
                    onValueChange={handleMarketingChange}
                />
            </View>

            <View style={styles.settingCard}>
                <Text style={styles.settingText}>Latest news</Text>
                <Switch
                    value={preferences.smsNotifications}
                    onValueChange={handleNewsChange}
                />
            </View>
        </View>
    );
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
        margin: 16,
    },
    settingText: {
        fontSize: 24,
        alignItems: 'center',
    },
});

export default AccountScreen;