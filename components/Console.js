import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import {event} from 'react-native-reanimated';
import axios from 'axios';
import {StackActions} from '@react-navigation/native';

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
  async function deleteFile() {
    await axios(`http://127.0.0.1:5000/deleteFile?file=${fileName}`)
      .then((response) => {
        alert('¡Tu archivo se ha eliminado exitosamente!');

        const popAction = StackActions.pop(1);

        navigation.dispatch(popAction);
      })
      .catch((err) => {
        alert('¡Tu archivo no se ha eliminado exitosamente!');
      });
  }

  async function runFile() {
    await axios(
      `http://127.0.0.1:5000/compiler?input=${input}&name=${fileName}`,
    )
      .then((response) => {
        console.log(response.data.data);
        Alert.alert(
          'Result',
          String(response.data.data),
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );

        //alert(response.data.data);
        setPendiente(true);
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err.response.data.data);
      });
  }

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: 25,
        backgroundColor: 'white',
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
        placeholder="¡Escribe tu código aquí!"
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
          height: '10%',
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
          <TouchableOpacity
            backgroundColor="#38B6FF"
            style={{
              width: '65%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '10%',
              marginTop: '5%',
              backgroundColor: '#0a4daa',
              borderRadius: 100,
              height: 40,
            }}
            onPress={() => runFile()}>
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
                Ejecutar archivo{' '}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            backgroundColor="#38B6FF"
            style={{
              width: '65%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '10%',
              marginTop: '5%',
              backgroundColor: '#0a4daa',
              borderRadius: 100,
              height: 40,
            }}
            onPress={() => saveFile()}>
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
                Guardar archivo{' '}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {!route.params.new ? (
        <TouchableOpacity
          style={{
            width: '65%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '10%',
            marginTop: '5%',
            backgroundColor: '#C23636',
            borderRadius: 100,
            height: 40,
          }}
          onPress={() => deleteFile()}>
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
              Borrar archivo{' '}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default NewProgram;
