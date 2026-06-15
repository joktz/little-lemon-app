import * as React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={styles.container}>
      <Image source={require('../assets/little-lemon-logo.png')} style={styles.image} />
      <Text style={styles.text}>Little Lemon, your local Mediterranean Bistro</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Subscribe')}>
          <Text style={styles.buttonText}>Newsletter</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>See Menu</Text>
        </Pressable>
      </View>
    </View>
  )
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text:{
    fontSize: 24,
    textAlign: 'center',
    marginRight: 16,
    marginLeft: 16,
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#495E57',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
    margin: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})