import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import axios from 'axios';
const customData = require('./Program.json');

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

function TableView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  var list = [];
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
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Cargando ...</Text>
      ) : (
        data.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.createdAt}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </View>
  );
}

export default TableView;
