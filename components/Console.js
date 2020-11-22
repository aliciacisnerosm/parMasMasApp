import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {event} from 'react-native-reanimated';
import axios from 'axios';
import {StackActions} from '@react-navigation/native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 10,
    width: 100,
  },
});

const NewProgram = ({route, navigation}) => {
  const [fileName, setFileName] = React.useState('');
  const [code, setCode] = React.useState('');
  const [pendiente, setPendiente] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function writeToFile(val) {
    setCode(val);
    setPendiente(false);
  }
  useEffect(() => {
    async function fetchData(file_name) {
      await axios(`http://localhost:5000/readFile?file=${file_name}`)
        .then((res) => {
          console.log(res.data, 'file');
          setCode(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (route != undefined) {
      if (route.params.name) {
        console.log('fetch a prog nuevo');
        setFileName(route.params.name);
        fetchData(route.params.name);
      } else {
        setFileName(route.params.name);
      }
    }
  }, [fileName]);

  async function saveData() {
    await axios
      .post('http://127.0.0.1:5000/saveFile', {
        file: `${code}`,
        name: fileName,
      })
      .then(
        (response) => {
          console.log(response);
          setPendiente(true);
        },
        (error) => {
          console.log(error);
          alert('Tu archivo no pudo ser guardado, intenta otra vez (:');
        },
      );
  }

  function saveFile() {
    saveData();
  }

  async function runFile() {
    console.log(input, 'input', fileName, 'name');
    await axios(
      `http://127.0.0.1:5000/compiler?input=${input}&name=${fileName}`,
    ).then(
      (response) => {
        console.log(response.data.data);
        Alert.alert(
          'Result',
          String(response.data.data),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );

        //alert(response.data.data);
        setPendiente(true);
      },
      (error) => {
        console.log(error);
        //alert('Tu archivo no pudo ser guardado, intenta otra vez (:');
      },
    );
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
          height: '60%',
          alignItems: 'flex-start',
          marginTop: '10%',
          marginBottom: '10%',
          textAlignVertical: 'top',
          fontSize: 15,
          padding: '5%',
          fontFamily: 'Courier New',
        }}
        selectTextOnFocus={true}
        multiline={true}
        numberOfLines={100}
        placeholder="Your code goes here!"
        onChangeText={(value) => writeToFile(value)}
        value={code}
        //  onChange={(event) => console.log(event.nativeEvent.text)}
      />

      <TextInput
        style={{
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 3,
          width: '80%',
          height: '15%',
          marginBottom: 10,
          fontSize: 15,
          padding: 20,
          textAlignVertical: 'top',
          fontFamily: 'Courier New',
        }}
        placeholder="Input"
        onChangeText={(value) => setInput(value)}></TextInput>

      <View style={styles.container}>
        {pendiente ? (
          <Button
            title="Run"
            type="outline"
            onPress={() => runFile()}
            style={styles.button}></Button>
        ) : (
          <Button
            title="Save"
            type="outline"
            style={styles.button}
            onPress={() => saveFile()}></Button>
        )}
      </View>
    </View>
  );
};

export default NewProgram;
