import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  button: {
    width: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10%',
    marginTop: '5%',
    backgroundColor: '#0a4daa',
    borderRadius: 100,
    height: 40,
  },
});

const NewProgram = ({props, navigation}) => {
  const [name, setName] = useState('');

  function setProgramName(event) {
    setName(event);
  }

  async function writeToFile(val) {
    await axios(`http://localhost:5000/createFile?file=${val}`)
      .then((res) => {
        console.log(res.data);
        alert('Se creó un nuevo archivo. Happy coding!!');
        navigation.navigate('Console', {new: true, name: val});
      })
      .catch((err) => {
        console.log(err);
        alert('ERROR: No se pudo crear tu archivo ):');
      });
  }

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
      }}>
      <View style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Avenir Next',
            margin: '11%',
            fontWeight: '500',
          }}>
          Nombre del programa
        </Text>
        <View
          style={{
            width: '80%',
            display: 'flex',
            alignContent: 'center',
            margin: '10%',
          }}>
          <View>
            <Input
              placeholder="hello-world"
              style={{fontFamily: 'Avenir Next'}}
              onChangeText={(value) => setProgramName(value)}
            />
          </View>
        </View>
        <TouchableOpacity
          backgroundColor="#38B6FF"
          style={styles.button}
          onPress={() => {
            writeToFile(name);
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir Next',
                padding: '3%',
                fontWeight: 'bold',
                fontSize: 18,
                color: 'white',
              }}>
              Guardar{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewProgram;
