import React, { useContext } from 'react'
import { FlatList, StatusBar, Text } from 'react-native'
import countries from '../context/countryCodes'
import tailwind from 'tailwind-rn'
import { AuthConstants, AuthContext } from '../context/AuthStore'

const CountrySelect = ({ navigation }) => {
    const authContext = useContext(AuthContext)

    return (
        <React.Fragment >
            <StatusBar barStyle="dark-content" backgroundColor="#FCD34D" />
            <FlatList
                style={tailwind("bg-white")}
                data={countries}
                keyExtractor={item => item["name"]}
                renderItem={({ item, index }) =>
                    <Text
                        key={item["name"]}
                        onPress={() => {
                            authContext.dispatcher({
                                type: AuthConstants.COUNTRY,
                                country: item
                            })
                            navigation.goBack()
                        }}
                        style={tailwind("text-gray-800 pl-4 py-1")}
                    >
                        {item["name"]}
                        <Text
                            style={tailwind("text-sm")}
                        >{" (" + item["code"] + " " + item["dial_code"] + ")"}</Text>
                    </Text>

                }
                initialNumToRender={5}
            />
        </React.Fragment>
    )
}


export default CountrySelect