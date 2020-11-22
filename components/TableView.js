import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ListItem, Avatar, Icon, Button} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import axios from 'axios';
const customData = require('./Program.json');

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
const TableView = ({props, navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  var list = [];
  const isFocused = useIsFocused();

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      console.log('componentDidMount');
      await axios('http://localhost:5000/files')
        .then((res) => {
          setData(res.data.files);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, [isFocused]);

  function getFile(name) {
    navigation.navigate('Console', {new: false, name: name});
  }
  return (
    <View>
      {loading ? (
        <Text>Cargando ...</Text>
      ) : (
        data.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => getFile(item.name)}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.createdAt}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </View>
  );
};

export default TableView;
