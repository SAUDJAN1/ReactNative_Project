import { baseUrl } from '../utils/api';
import { View, Text, TextInput, StyleSheet, Pressable,Alert} from 'react-native'
import React, {  useState } from 'react'

const RegisterScreen = ({ navigation }) => {
  const[error,setError]=useState(null);
  const[dispPassword,setDisplayPassword]=useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  //handle onChange
  const handleOnChange=(key,value)=>
  {
    setForm({
      ...form,
      [key]:value

    })
  }
 // Handle Register     
 const handleRegister=async()=>
 {
  try {
    const res=await fetch(`${baseUrl}/login`,{method:"POST",headers:{
      'Content-Type': 'application/json',
    },body:JSON.stringify(form)});
 
   const data=await res.json();
   if(res.ok)
   {
    setError("");
    Alert.alert("Registration Message",data.message);
    navigation.navigate('login')
   }
   else
    {
      setError(data.message);
    }

  } catch (error) {
    setError(error.message);
    
  }
 }
  
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
      <Text style={{ backgroundColor: "green", padding: 10, margin: 10, borderRadius: 10, fontSize: 24, fontWeight: "500" }}>Register Page</Text>
      <View>
        <TextInput style={styles.input} placeholder='Enter Your Name' onChangeText={(text)=>handleOnChange('name',text)} value={form.name} />
        <TextInput style={styles.input} placeholder='Enter Your Email' keyboardType='email-address' onChangeText={(text)=>handleOnChange('email',text)} value={form.email} />
        <TextInput style={styles.input} placeholder='Enter Your Password' secureTextEntry={!dispPassword} onChangeText={(text)=>handleOnChange('password',text)} value={form.password} />
          {
            dispPassword ? 
            <Text onPress={()=>setDisplayPassword(false)} style={{color:"red",fontSize:16}}>Hide Password</Text> :
            <Text onPress={()=>setDisplayPassword(true)} style={{color:"green",fontSize:16}}>Show Password</Text>  
          }
      </View>
      {error && <Text style={{ color: "red", fontSize: 16, marginTop: 10 }}>{error}</Text>}
      <Pressable style={styles.pressable} onPress={handleRegister}>
        <Text style={styles.text}>Register</Text>
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
  },
  pressable: {
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
export default RegisterScreen