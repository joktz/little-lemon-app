import React, {useState} from 'react';
import { View, ScrollView,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Platform } from 'react-native';

// Import email validation method
import { validateEmail } from '../utils';

const SubscribeScreen = ({navigation}) => {

  const [email, onChangeEmail] = React.useState('');
  const isEmailValid = Boolean(validateEmail(email));
  // Enable button when value put into the text input
  const buttonPressable = email.length > 0

  // subscribe state 
  const [subscribed, onSubscription] = React.useState(false);

  // Display alert regardless of web or mobile
  const subscribe = () => {
    console.log(Platform.OS);

    if (validateEmail(email)) {
      if (Platform.OS == 'web') {
        alert('Thanks for subscribing, Stay tuned!')
      } else {
        Alert.alert(
          'Thanks for subscribing, stay tuned!',
          [{text: 'Ok'}]
      )}
      onSubscription(true);
      onChangeEmail('');
    } else {
      if (Platform.OS == 'web') {
        alert('Please enter a valid email.')
      } else {
        Alert.alert(
          'Please enter a valid email.',
          [{text: 'Ok'}]
      )}
    }
  }

  // Add subscribe screen code here
  return (
    <KeyboardAvoidingView style={styles.keyboardContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/little-lemon-logo-grey.png')} style={styles.image}/>
        <Text style={styles.text}>Subscribe to our newsletter for our latest delicious recipes!</Text>
        <TextInput 
          value={email}
          onChangeText={onChangeEmail}
          placeholder={(subscribed ? ('Subscription successful!') : ('Enter your email here...'))}
          keyboardType='email-address'
          style={styles.input}
          editable={!subscribed}
        />
        <Pressable 
          style={[
            styles.button,
            (!buttonPressable && styles.buttonDisabled) || subscribed && styles.buttonDisabled
          ]}
          disabled={!buttonPressable || subscribed}
          onPress={() => subscribe()}
        >
          {subscribed? (
            <Text style={styles.buttonText}>Subscribed!</Text>
          ):(
            <Text style={styles.buttonText}>Subscribe</Text>
          )}
        </Pressable>
        {subscribed && (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Welcome')}>
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.buttonText}>See Menu</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
};

export default SubscribeScreen;


// KeyboardAvoiding view messeses with flex and screen filling
// Had to create layered views / containers to get items to space without manual margins
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  text:{
    fontSize: 24,
    textAlign: 'center',
    marginRight: 16,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    margin: 16,
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
  buttonDisabled:{
    backgroundColor: '#C7C7C7',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  input:{
    width: '80%',
    height: 40,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  }
})