import React, { Component } from 'react';
import {  View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';

import firebase from 'react-native-firebase';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      pwd: '',
    }
  }
  
  onLogin = () => {
    const {email, pwd} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,pwd)
      .then((user)=> {

      })
      .catch((error)=> {
        const{code, msg} = error;
        Alert.alert('Error '+code, msg);
      })
  }

  onRegister = () => {
    const {email, pwd} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email,pwd)
      .then((user) => {

      })
      .catch((error)=> {
        const{code, msg} = error;
        Alert.alert('Error '+code,code+" "+ msg);
      })
  }


  render() {
    return (
      <View style = {styles.container}>
      <StatusBar 
        barStyle = 'light-content'
        />
        <TextInput  style = {styles.input} 
                    placeholder = "email"
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    underlineColorAndroid = {'rgba(255,255,255,0)'}
                    selectionColor = {'#c0392b'}
                    onSubmitEditing = {()=> this.passwordInput.focus()}
                    keyboardType = 'email-address'
                    autoCapitalize = 'none'
                    onChangeText = {(text) => this.setState({
                      email: text
                    })}
                    />
        <TextInput  style = {styles.input} 
                    placeholder = 'password'
                    placeholderTextColor = "rgba(255,255,255,0.7)"
                    underlineColorAndroid = {'rgba(255,255,255,0)'}
                    ref = {(input)=> this.passwordInput = input}
                    selectionColor = {'#c0392b'}
                    secureTextEntry
                    onChangeText = {(text) => this.setState({
                      pwd:text
                    })}/>
        <TouchableOpacity 
        style = {styles.buttonContainer}
        onPress = {this.onLogin}>
          <Text style = {styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style = {styles.buttonContainer}
        onPress = {this.onRegister}>
          <Text style = {styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
      padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: "#FFF",
        paddingHorizontal: 10,
    },
    buttonContainer: {
      backgroundColor: '#c0392b',
      paddingVertical: 10,
      marginBottom: 10
    },
    buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700',
    },
});

