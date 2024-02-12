import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { colors, parameters} from '../global/styles'

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: '#e4e4e4',
        // borderRadius: 10,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 5,
        borderBottomWidth: 1
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? colors.grey3 : '#e4e4e4',
          // borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : colors.orange,
            fontSize: 14,
            // fontFamily: 'Roboto-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? colors.grey3 : '#e4e4e4',
          // borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : colors.orange,
            fontSize: 14,
            // fontFamily: 'Roboto-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}