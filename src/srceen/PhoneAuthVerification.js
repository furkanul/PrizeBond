import React from 'react'
import { useContext } from 'react'
import tailwind from 'tailwind-rn'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthConstants, AuthContext } from '../context/AuthStore'
import auth from '@react-native-firebase/auth'
import { useState ,useEffect} from 'react'
// import {  } from 'react/cjs/react.development'

const PhoneAuthVerification = ({ navigation }) => {
    const authContext = useContext(AuthContext)

    const [user,setUser] = useState()
    useEffect(()=>{
        const userSubscriber = auth().onAuthStateChanged((us)=>{
            setUser(us)
        })
        return userSubscriber
    },[])

    const handleVerify = async () => {
        try{
            console.log(authContext.state)
            await authContext.state.confirmState.confirm(authContext.state.verificationCode)
            navigation.replace("MainTab")

        }catch(err){
            navigation.goBack()
            Alert.alert("Issh!","Something unknown has happened!")
        }
    }
    return (
        <View style={tailwind("h-full flex justify-center items-center")}>
            <View style={tailwind("w-9/12")}>
                <Text style={tailwind("text-gray-700")}>A verification code was sent to your number. Please enter the code to verify.</Text>
                <View style={tailwind("mt-4 flex items-center")}>
                    <TextInput
                        style={tailwind("border border-yellow-500  rounded-md px-4 text-lg w-full")}
                        placeholder={"Verification code"}
                        onChangeText={(text)=>{
                            authContext.dispatcher({
                                type:AuthConstants.VERIFICATION_CODE,
                                verificationCode:text
                            })
                        }}
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity
                        onPress={handleVerify}
                    >
                        <Text style={tailwind("px-4 py-3 rounded mt-4 bg-yellow-500 text-white")}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PhoneAuthVerification