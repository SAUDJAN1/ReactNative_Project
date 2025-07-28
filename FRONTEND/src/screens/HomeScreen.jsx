import { View, Text, Button, StyleSheet ,Pressable} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1,backgroundColor:"green",justifyContent:'center', alignItems: 'center'}}>
      <Text style={{borderWidth:2,padding:10,borderRadius:10,fontSize:30}}>HomeScreen</Text>
     <View style={{flexDirection:"row",gap:10}}>

      <Pressable style={styles.pressable} onPress={() => navigation.navigate('register')}  >
        <Text style={styles.text}>Go To Register Page</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('login')}  >
        <Text style={styles.text}>Go To Login Page</Text>
      </Pressable>
     </View>
    </View>
  )
}
const styles=StyleSheet.create({
  pressable: {
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    borderWidth:2
  },
  text:{
    fontSize: 16,
    fontWeight: "500",
  }
})
export default HomeScreen