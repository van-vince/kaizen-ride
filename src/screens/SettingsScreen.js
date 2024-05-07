import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/contexts'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const SettingsScreen = () => {

  const {logout} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "green",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 40,
          marginTop: 50,
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            marginLeft: 10,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "fffff",
    paddingBottom: 30,
    paddingTop: getStatusBarHeight(),
  },
})