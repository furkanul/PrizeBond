import React, { useEffect, useRef, useState } from 'react'
import tailwind from 'tailwind-rn'
import { Alert, Image, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useContext } from 'react'
import { AuthConstants, AuthContext } from '../context/AuthStore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from "@react-native-firebase/auth"


const PhoneAuth = ({ navigation }) => {
    const phoneNumberRef = useRef(null)
    const [isFocused, setIsFocused] = useState(true)
    const authContext = useContext(AuthContext)

    const [user, setUser] = useState()

    useEffect(() => {
        const userSubscriber = auth().onAuthStateChanged((user) => {
            setUser(user)
        })

        return userSubscriber
    }, [])

    const handleSend = async () => {
        if (authContext.state.phoneNumber.length < 5) {
            Alert.alert("Invalid number", "Please enter a valid phone number to continue.")
        } else {
            try {
                const confirmState = await auth().signInWithPhoneNumber(authContext.state.country.dial_code + authContext.state.phoneNumber)
                authContext.dispatcher({ type: AuthConstants.CONFIRM_STATE, confirmState: confirmState })
                navigation.push('PhoneAuthVerification')

            } catch (error) {
                Alert.alert("Can't verify!", "Maybe you gave me wrong phone number/internet not working?")
            }

        }
    }
    
    if (!user) {

        return (
            <ScrollView style={tailwind("h-full bg-white")}>
                <KeyboardAvoidingView style={tailwind("")}>

                    <View style={tailwind("h-full bg-white")}>
                        <StatusBar barStyle="dark-content" backgroundColor="#FCD34D" />

                        <View style={tailwind("w-full flex flex-row justify-center mt-10 ")} >
                            <Image source={require("../../assets/img/logo.png")} style={{ width: 50, height: 50 }} resizeMode={"contain"} />
                        </View>
                        <View style={tailwind("w-full flex flex-row justify-center mt-4 mb-16")} >
                            <Image source={require("../../assets/img/prizebond_text.png")} resizeMode={"contain"} style={{ width: 200, height: 44 }} />
                        </View>


                        <KeyboardAvoidingView style={tailwind("flex flex-col justify-center items-center")}>
                            <Text style={tailwind("text-sm text-gray-700 mb-1")}>Enter your phone number below to continue</Text>
                            <View style={tailwind(` flex flex-row justify-center items-center border ${isFocused ? "border-yellow-500" : "border-yellow-700"} rounded-lg`)}>
                                <Text
                                    style={tailwind(` text-yellow-500 py-1 px-2  border-r-2 ${isFocused ? "border-yellow-500" : "border-yellow-400"}`)}
                                    onPress={() => { navigation.push("CountrySelect") }}
                                >
                                    <Icon name={"phone"} color={"#F59E0B"} style={tailwind("px-2")} /> {authContext.state.country["code"]}: {authContext.state.country["dial_code"]}
                                </Text>

                                <TextInput
                                    style={tailwind(`font-bold  w-7/12  px-2 text-black`)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    ref={phoneNumberRef}
                                    keyboardType={"phone-pad"}
                                    onChangeText={text => authContext.dispatcher({ type: AuthConstants.PHONE_NUMBER, phoneNumber: text })}
                                    editable={authContext.state.editable}
                                />
                            </View>

                            <TouchableOpacity
                                style={tailwind("flex flex-row justify-center mt-4")}
                                disabled={!authContext.state.editable}
                                onPress={handleSend}
                            >
                                <Text style={tailwind("py-3 px-4 rounded-md  bg-yellow-500 text-white")}>Send</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    } else {
        return (
            <View style={tailwind("h-full bg-white")}>
                <StatusBar barStyle="dark-content" backgroundColor="#FCD34D" />

                <View style={tailwind("w-full flex flex-row justify-center mt-10 ")} >
                    <Image source={require("../../assets/img/logo.png")} style={{ width: 50, height: 50 }} resizeMode={"contain"} />
                </View>
                <View style={tailwind("w-full flex flex-row justify-center mt-4 mb-16")} >
                    <Image source={require("../../assets/img/prizebond_text.png")} resizeMode={"contain"} style={{ width: 200, height: 44 }} />
                </View>


                <KeyboardAvoidingView style={tailwind("flex flex-col justify-center items-center")}>
                    <Text style={tailwind("text-sm text-gray-700 mb-1")}>You are already signed in!</Text>


                    <TouchableOpacity
                        style={tailwind("flex flex-row justify-center mt-4")}
                        disabled={!authContext.state.editable}
                        onPress={() => {
                            navigation.replace("MainTab")
                        }}
                    >
                        <Text style={tailwind("py-3 px-4 rounded-md  bg-yellow-500 text-white")}>Go Back!</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>)
    }
}


export default PhoneAuth