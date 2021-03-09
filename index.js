import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

const Card = (props) => {
  const data = props.data;
  const val = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState(props.title);

  const heightInterpolator = val.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });
  const imageInterpolator = val.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
    extrapolate: 'clamp',
  });

  const onClicked = () => {
    const toValue = open ? 0 : 1;
    Animated.timing(val, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setOpen((open) => !open);
    });
  };

  return (
    <View>
      <View
        style={{
          height: 50,
          width: props.width,
          elevation: 1,
          borderRadius: 4,
          backgroundColor: 'rgb(255,255,255)',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: props.width,
            elevation: 1,
            borderRadius: 4,
            backgroundColor: 'rgb(255,255,255)',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            onClicked();
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{marginLeft: 16, paddingLeft: 4, paddingRight: 4}}>
            {cardTitle}
          </Text>
          <Animated.Image
            source={require('./down-arrow.png')}
            style={{
              height: 18,
              width: 18,
              marginRight: 16,
              transform: [{rotate: imageInterpolator}],
            }}
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={{height: heightInterpolator, width: props.width}}>
        <Animated.FlatList
          data={data}
          showsVerticalScrollIndicator={true}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: props.width,
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}></View>
          )}
          keyExtractor={(item) => item.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onClicked(),
                    setCardTitle(data[index]),
                    props.onItemSelected(data[index]);
                }}>
                <View
                  style={{
                    height: 50,
                    width: props.width,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Card;
