import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import {ListItem, Avatar, Icon, Button} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import parmasmaslogo from '../utils/parmasmas_logo.png';
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
      <ScrollView>
        {loading ? (
          <Text>Cargando ...</Text>
        ) : (
          data.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={() => getFile(item.name)}>
              <Avatar
                rounded
                size={50}
                source={{
                  uri:
                    '/Users/aliciacisneros/Downloads/ITC/9no/compiladores/compilador-app/parMasMasApp/utils/parmasmas_logo.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{fontFamily: 'Avenir Next', fontWeight: '500'}}>
                  {item.name}
                </ListItem.Title>

                <ListItem.Subtitle
                  style={{
                    color: 'grey',
                    fontSize: 14,
                    fontFamily: 'Avenir Next',
                  }}>
                  {item.createdAt}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TableView;
