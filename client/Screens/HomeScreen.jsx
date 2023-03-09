import React from 'react';
import {useEffect, useContext, useState} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState(null);
  const { logout} = useContext(AuthContext);

  useEffect(() => {
    async function loadScouteurs() {
      try {
        const response = await axios.get('http://192.168.9.71:5000/api/auth/users');
        console.log("test    ",response.data);
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadScouteurs();
  }, []);

  return (
   <MapView
      style={styles.map}
      initialRegion={{
        latitude: 32.3123,
        longitude: -9.2311,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {/* { users ? users.map((user) => (
        <Marker
          key={user.id}
          coordinate={{
            latitude: user.latitude,
            longitude: user.longitude,
          }}
          title={user.name}
        /> 
      )) : null
    } */}


<Marker
        
        coordinate = {{
          latitude: 32.3123,
          longitude: -9.2311,
        }}

        title="TEST"
      />
      { users &&
      Object.values(users).map(user => {
         <Marker
        key={user._id}
        coordinate = {{
          latitude: user.latitude,
          longitude: user.longitude,
        }}

        title={user.name}
      /> ;
      })
      }
    
        
                 
    </MapView> 
  );
 

}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  Button:{
    marginEnd: 10,
    backgroundColor: '#A5E3CC',
    padding: 10,
    width: '100%',
    marginTop: 50,
    marginLeft: 1,    
  },
});
