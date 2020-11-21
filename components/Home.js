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

const Stack = createStackNavigator();

const Home = ({props, navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>ParMasMas</Text>
        <View style={styles.newButton}>
          <Button
            title="New"
            type="outline"
            style={styles.button}
            onPress={() => {
              navigation.navigate('NewProgram', {name: 'Jane'});
            }}></Button>
        </View>
      </View>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.tableview}>
          <Table></Table>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: '5%',
    width: '80%',
  },
  newButton: {marginRight: '10%'},
  button: {width: '20%', height: 50, textAlign: 'center'},
  header: {
    marginTop: '20%',
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tableview: {margin: '10%'},
});

export default Home;
