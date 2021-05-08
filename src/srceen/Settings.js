import React from 'react'
import { SafeAreaView, StatusBar, Text, View } from 'react-native'
import tailwind from 'tailwind-rn'
const Settings = () => {
    return (
        <SafeAreaView style={tailwind("bg-white")}>
            <View 
                style={tailwind("px-4 py-2")}
            >

            <Text>Cloud sync?</Text>
            </View>
        </SafeAreaView>
    )
}

export default Settings