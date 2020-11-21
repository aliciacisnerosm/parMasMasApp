import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const NewProgram = ({props, navigation}) => {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  function setProgramName(event) {
    setName(event);
  }

  async function writeToFile(path, val) {
    var path = '../files' + `/${name}.txt`;
    var program = `program ${name} :
    var int: variable;
    
    main (){
     write("hello world");
    }`;

    alert('Se creó un nuevo archivo. Happy coding!!');
  }

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        fontSize: 25,
      }}>
      <TextInput
        style={{
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 3,
          width: '80%',
          height: '70%',
          alignItems: 'flex-start',
          marginTop: '10%',
          marginBottom: '10%',
          textAlignVertical: 'top',
          fontSize: 25,
          padding: '5%',
          fontFamily: 'Courier New',
        }}
        selectTextOnFocus={true}
        multiline={true}
        numberOfLines={100}
        placeholder="Your code goes here!"
      />
      <Button
        title="Run"
        type="outline"
        onPress={(event) => writeToFile()}></Button>
      {/* CREAR NUEVO .TXT CON ESE NOMBRE - CREA LA KEY EN JSON & MANDA A SIG VENTANA  */}
      {/* <Modal.Title>Nombre del archivo</Modal.Title> */}
    </View>
  );
};

export default NewProgram;
