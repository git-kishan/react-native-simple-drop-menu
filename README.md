# react-native-simple-drop-menu

## Installation

#### npm i react-native-simple-drop-menu

#
#
#
#
#
```sh
import React from 'react';
import {View,Text} from 'react-native';
import Card from 'react-native-simple-drop-menu';

const App=()=>{
  const data=["Mrinal kumar karn","Negaht nazir","Shubham kumar","Raju kumar","Devendra singh"]
  return (
    <View style={{flex : 1}}>
        <Card 
           data={data}
           title="Select one of these item"
           onItemSelected={(item)=>{console.log(item +" is selected")}}
           width={300}
         />
    </View>
  )
}
export default App;
```
