import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      isLoading: false,
      APIdata : []
    }
  }

  componentDidMount(){
    fetch('https://reqres.in/api/users/2')  
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        APIdata: responseJson,
      })
    })
    .then(_ => console.log(this.state.APIdata))
    .catch((error) => alert(error))
    .then(_ => this.setState({
      isLoading: false
    }));
  }

  renderItem(obj) {

    const item = (obj.ReadyForPickups || [])[0] || {};
    // this will secure your app not crash when item is invalid data.
 
    return (
      <View>
        <View>
          <Text>{item.first_name}</Text>
          <Text>{item.last_name}</Text>
        </View>
 
    </View>
 );
 }
    render(){
        return (
          <>
              <View style={styles.container}>
                {this.state.isLoading ? 
                <ActivityIndicator size="large" animating /> 
                : this.state.APIdata.length !== 0 
                ?
                <View>
                {this.state.APIdata.map(item => this.renderItem(item))}
                </View>
                :
                <Text>
                  Failed to load data
                </Text>
                }
              </View>
          </>
        )
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


