import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
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
        margin: '10%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text>Nombre del programa</Text>
      <Input
        placeholder="hello-world"
        onChangeText={(value) => setProgramName(value)}
      />
      <Button
        title="Guardar"
        type="outline"
        onPress={() => writeToFile(name)}></Button>
      <Text>{name}</Text>
    </View>
  );
};

export default NewProgram;
