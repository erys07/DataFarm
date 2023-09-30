import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../authContext/AuthContext';

function Stop() {
  const { token } = useAuth();
  
  const handleLogToken = () => {
    console.log('Token:', token);
  };

  return (
    <View>
      <Text>stopRecord</Text>
      <TouchableOpacity onPress={handleLogToken}>
        <Text>Exibir Token no Log</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Stop;