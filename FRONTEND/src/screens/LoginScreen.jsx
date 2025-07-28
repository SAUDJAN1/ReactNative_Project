import { baseUrl } from '../utils/api';
import { View, Text, TextInput, StyleSheet, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "", password: ""
  })
  const handleOnChange = (key, value) => {
    setForm({ ...form, [key]: value })
  }
  const handleLogin = async () => {
    try {
      const res = await fetch( `${baseUrl}/login`, {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setError("");
        Alert.alert("Login Successful", data.message);
        navigation.navigate('home');
      }
      else {
        setError(data.message);
      }

    } catch (error) {
      setError(error.message);
      Alert.alert("Login Failed", error.message);
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }} >
      <Text style={{ backgroundColor: "green", padding: 10, margin: 10, borderRadius: 10, fontSize: 24, fontWeight: "500" }}>LoginScreen</Text>
      <View>
        <TextInput style={styles.input} placeholder='Enter Your Email' keyboardType="email-address" value={form.email} onChangeText={(text) => handleOnChange('email', text)} />
        <TextInput style={styles.input} placeholder='Enter Your Password' secureTextEntry={true} value={form.password} onChangeText={(text) => handleOnChange('password', text)} />
      </View>
      {error && <Text style={{ color: "red", fontSize: 16, marginTop: 10 }}>{error}</Text>}
      <Pressable style={styles.pressable} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  }, pressable: {
    width: 300,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,

  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  }
})

export default LoginScreen