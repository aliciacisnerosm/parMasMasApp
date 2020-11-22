import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
} from 'react-native';
import 'react-native-gesture-handler';
import Table from './TableView';
import {Button} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Home = ({props, navigation}) => {
  console.log(navigation);
  return (
    <>
      <>
        <Button
          title="Crear nuevo archivo"
          type="outline"
          style={styles.button}
          onPress={() => {
            navigation.navigate('NewProgram', {
              onGoBack: () => this.refresh(),
            });
          }}></Button>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.tableview}>
            <Table navigation={navigation}></Table>
          </ScrollView>
        </SafeAreaView>
      </>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
  },

  tableview: {margin: '10%'},
});

export default Home;
