import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneAuth from './PhoneAuth';
import CountrySelect from './CountrySelect';
import { AuthProvider } from '../context/AuthStore';
import PhoneAuthVerification from './PhoneAuthVerification';
import MainTab from './MainTab';


const AuthStack = createStackNavigator()

const PhoneAuthStack = () => {
    return (
        <AuthProvider>
            <AuthStack.Navigator headerMode={"none"} initialRouteName={"MainTab"} >
                <AuthStack.Screen name={"MainTab"} component={MainTab} />
                <AuthStack.Screen name={"PhoneAuth"} component={PhoneAuth} />
                <AuthStack.Screen name={"CountrySelect"} component={CountrySelect} />
                <AuthStack.Screen name={"PhoneAuthVerification"} component={PhoneAuthVerification} />
            </AuthStack.Navigator>
        </AuthProvider>
    )
}
export default PhoneAuthStack