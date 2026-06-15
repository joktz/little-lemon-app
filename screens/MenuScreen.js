import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Menu fetching function



// The returned screen
const MenuScreen = () => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const getMenu = async () => {
            try {
            const response = await fetch(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json', {

                }
            );
            const data = await response.json();
            setResponse(data.menu);
            } catch (error) {
                console.error(error);
            }
        };
    getMenu();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>MENU</Text>
            {
                response ? (
                    <FlatList
                        data={response}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.menuCard}>
                                <Text style={styles.menuText}>{item.title}</Text>
                                <Text style={styles.menuText}>${item.price}</Text>
                            </View>    
                        )}
                    />
                ) : (
                    <Text>We're sorry! The menu isn't loading right now...</Text>
                )
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#333333',
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        alignItems: 'center',
        color: 'yellow',
    },
    menuCard: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuText: {
        color: 'yellow',
        fontSize: 24,
    }
})

export default MenuScreen;