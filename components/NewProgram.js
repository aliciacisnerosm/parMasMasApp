import React, {useState} from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';

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
  async function saveNewProgram(event) {
    return new Promise((resolve, reject) => {
      FileSystem.writeToFile(path, 'utf8', (err, program) => {
        if (err) reject(err);
        resolve(program);
      });
    });
  }

  async function writeToFile(path, val) {
    var path = '../files' + `/${name}.txt`;
    var program = `program ${name} :
    var int: variable;
    
    main (){
     write("hello world");
    }`;

    alert('Se creó un nuevo archivo. Happy coding!!');
    navigation.navigate('Console');
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
        onPress={(event) => writeToFile()}></Button>
      {/* CREAR NUEVO .TXT CON ESE NOMBRE - CREA LA KEY EN JSON & MANDA A SIG VENTANA  */}
      <Text>{name}</Text>
      {/* <Modal.Title>Nombre del archivo</Modal.Title> */}
    </View>
  );
};

export default NewProgram;
