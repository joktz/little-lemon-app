import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Menu fetching function



// The returned screen
const MenuScreen = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const getMenu = async () => {
            try {
            const response = await fetch(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json'
            );
            const json = await response.json();
            setResponse(json);
            } catch (error) {
                console.error(error);
            }
        };
    getMenu();
    }, []);

    return (
        <View>
            <Text style={styles.header}>MENU</Text>
            <Text>{response ? 'Response found' : 'None found'}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 24,
        alignItems: 'center',
    }
})

export default MenuScreen;