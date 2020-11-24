import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import Table from './TableView';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import parmasmas from '../utils/parmasmas.png';

const Home = ({props, navigation}) => {
  console.log(navigation);
  return (
    // <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollview}>
      <View style={{flex: 1}}>
        <>
          <Image style={styles.logo} source={parmasmas}></Image>

          <TouchableOpacity
            backgroundColor="#38B6FF"
            style={styles.button}
            onPress={() => {
              navigation.navigate('Programa', {
                onGoBack: () => this.refresh(),
              });
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
                  fontSize: 17,
                  color: 'white',
                }}>
                Crear nuevo archivo{' '}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.tableview}>
            <Table navigation={navigation}></Table>
          </View>
          <View>
            <Text>...</Text>
          </View>
        </>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  logo: {
    height: '10%',
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
  },
  tableview: {
    marginBottom: '10%',
    flex: 1,
  },

  scrollview: {
    backgroundColor: 'white',
  },
});

export default Home;
