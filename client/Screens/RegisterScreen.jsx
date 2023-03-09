import React, {useContext, useEffect, useState} from 'react';
import * as Location from "expo-location";

import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable 
} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const imgj = require('../assets/esccoter2.png');
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location1 = await Location.getCurrentPositionAsync({});
      setLocation(location1);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      // console.log("latitude    ",location.coords.latitude," longitude ",location.coords.longitude)
    })();

  })

  const {isLoading, register , errorMessage} = useContext(AuthContext);

  return (
 location &&  <View style={styles.container}>
      <Spinner visible={isLoading} />
        <Image source={imgj} style={{width: 200, height: 200, marginBottom:40}}/>
        <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />
         <TextInput
          style={styles.input}
          value={location.coords.latitude}
          placeholder="Enter latitude"
          onChangeText={text => setLatitude(text)}
        />
         <TextInput
          style={styles.input}
          value={location.coords.longitude}
          placeholder="Enter longitude"
          onChangeText={text => setLongitude(text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Pressable 
           style={styles.Button} 
           onPress={() => {
           register(name, email, password,latitude,longitude);
           navigation.navigate('./LoginScreen.jsx');
          }}
        >
            <Text style={{color: 'white', textAlign: 'center'}}>Register</Text>
         </Pressable>

        <View style={{flexDirection: 'row', marginTop: 20,justifyContent:"center"}}>
          <Text >Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.link}>Login</Text>
                {errorMessage && <Text>{errorMessage}</Text>}
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 100,
        paddingHorizontal: 20,
  },
  link: {
    color: '#5b3256',
  },
  Button: {
    borderRadius: 200,
    backgroundColor: '#5b3256',
    padding: 10
  }
});

export default RegisterScreen;