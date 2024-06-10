import { Text } from 'react-native';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';

export class Test extends Component {
  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: 'red', flex: 1 }}
      >
        {/* <Tabs>
          <Tabs.Screen 
          options={{
            title: 'cart',
            headerTitle: 'cart' ,
            backgroundColor: 'red',
            flex: 1,
        }}
          name='cart' />
        </Tabs> */}
        <Text>Test</Text>
      </SafeAreaView>
    );
  }
}

export default Test;