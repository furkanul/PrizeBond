import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { HumanReadable } from '../comps/utils'
import tailwind from 'tailwind-rn'
import { Searchbar } from 'react-native-paper';



const PrizeBondList = () => {

    const list_from_store = useSelector(state => state.bondSerials)
    const dispatch = useDispatch()
    const [bondList, setBondList] = useState([])
    const [workingList, setWorkingList] = useState([])


    useEffect(() => {
        setBondList(list_from_store)
        setWorkingList(list_from_store.slice(0, 25))
    }, [list_from_store])

    const handleDelete = (item) => {
        dispatch({
            type: "DELETE",
            item: item
        })
    }
    return (
        <SafeAreaView style={tailwind("bg-white")}>
            <Searchbar
                style={tailwind("border border-green-600 rounded-lg mt-4 mb-2  mx-4 text-sm h-11")}
                placeholder={"Search"}
                onChangeText={text => {
                    setWorkingList(() => bondList.filter(dt => dt.bondSerial.includes(text)))
                }} />
            <FlatList
                data={workingList}
                keyExtractor={item => item.key}

                renderItem={({ item }) => {
                    return (
                        <View
                            style={tailwind("w-full px-6")}
                            key={item.key}
                        >
                            <View
                                style={tailwind("flex flex-row justify-between mb-1 py-1  px-2 rounded")}
                            >
                                <Text
                                    style={tailwind("text-sm")}
                                >{HumanReadable(item.bondSerial)}</Text>
                                <View style={tailwind("flex flex-row")}>
                                    <Icon name={"delete"} size={20} color={"#F59E0B"} onPress={() => handleDelete(item)} />
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default PrizeBondList