import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext} from "../context/contexts"


const ProfileScreen = () => {

  const {logout} = useContext(AuthContext)
  const {userInfo} = useContext(AuthContext)
  const courier = userInfo?.courier;

  return (
    <View style={{top: 100}}>
      <Button title='logout'
      onPress={logout}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})