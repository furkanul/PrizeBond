import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import Modal from 'react-native-modal'
import { Checkbox } from 'react-native-paper'
import tailwind from 'tailwind-rn'
import LetterModal from './LetterModal'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'

const AddNewModal = ({ isVisibleP, togglerP }) => {


    const dispatch = useDispatch()
    const { width, height } = Dimensions.get("window")
    const [isSeries, setIsSeries] = useState(false)
    const [f1, setF1] = useState(false)
    const [f2, setF2] = useState(false)


    const [bondData, setBondData] = useState({
        bondFirstLetter: "ক",
        bondSecondLetter: "ক",
        bondSerial: "",
        seriesNumber: "1",
        disable: false
    })

    useEffect(() => {

    }, [isVisibleP])
    const toggler = () => {
        if (togglerP) {
            togglerP()
        }
    }

    const handleAdd = () => {
        if (bondData.bondSerial.length < 7) {
            ToastAndroid.showWithGravity(
                "Oh ho! Please enter a valid bond number!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        } else {
            setBondData(prev => ({ ...prev, disable: true }))

            if (isSeries) {
                setBondData(prev => ({ ...prev, disable: true }))
                const num = parseInt(bondData.seriesNumber)
                const serial = parseInt(bondData.bondSerial)

                for (let i = 0; i < num; i++) {
                    let m = serial + i
                    m = m.toString()

                    dispatch({
                        type: "ADD",
                        bondSerial: bondData.bondFirstLetter + bondData.bondSecondLetter + m
                    })
                }
                toggler()
                setBondData({
                    ...bondData,
                    disable: false
                })
            } else {
                setBondData(prev => ({ ...prev, disable: true }))
                dispatch({
                    type: "ADD",
                    bondSerial: bondData.bondFirstLetter + bondData.bondSecondLetter + bondData.bondSerial
                })
                setBondData(prev => ({ ...prev, disable: false }))
                toggler()
            }
        }
    }



    const handlePrizeBondNumber = (text) => {
        if (text.length > 7) {

        } else {
            setBondData(prev => ({
                ...prev,
                bondSerial: text
            }))
        }
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <View style={{ flex: 1 }}>
                    <Modal
                        isVisible={isVisibleP}
                        onBackdropPress={toggler}
                        useNativeDriver={true}
                        style={{

                            marginTop: (height / 2) - (height / 3),
                        }}
                        deviceHeight={height}
                        onBackButtonPress={toggler}
                    >
                        <View style={tailwind("h-56 bg-gray-50 rounded-lg p-2")}>
                            <View
                                style={tailwind("flex flex-row")}
                            >
                                <View style={{ ...tailwind("flex flex-row mr-8 items-center mt-2 "), overflow: 'hidden' }}>
                                    <TouchableOpacity
                                        style={tailwind("bg-green-500 w-14 rounded flex justify-center items-center mr-2")}
                                        onPress={() => setF1(prev => !prev)}
                                        disabled={bondData.disable}
                                    >
                                        <Text style={tailwind("py-1 text-lg text-white")}>{bondData.bondFirstLetter}</Text>
                                        <LetterModal isVisible={f1} togglerHandler={(letter) => {
                                            setBondData(prev => ({ ...prev, bondFirstLetter: letter }))
                                            setF1(prev => !prev)
                                        }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={tailwind("bg-green-500 w-14 rounded flex justify-center items-center mr-2")}
                                        onPress={() => setF2(prev => !prev)}
                                        disabled={bondData.disable}
                                    >
                                        <Text style={tailwind("py-1 text-center text-lg text-white")}>{bondData.bondSecondLetter}</Text>
                                        <LetterModal isVisible={f2} togglerHandler={(letter) => {
                                            setBondData(prev => ({ ...prev, bondSecondLetter: letter }))
                                            setF2(prev => !prev)
                                        }} />
                                    </TouchableOpacity>
                                    <Checkbox value={isSeries} status={isSeries ? 'checked' : 'unchecked'} onPress={() => setIsSeries(!isSeries)} />
                                    <Text style={tailwind("mr-4 bg-green-400 py-1 px-2 rounded-full")}>Series</Text>
                                    <TextInput
                                        editable={isSeries}
                                        keyboardType={"number-pad"}
                                        placeholder={"No"}
                                        style={tailwind(" border p-0 rounded px-2 border-green-500 w-10")}
                                        value={bondData.seriesNumber}

                                        onChangeText={text => setBondData(prev => ({
                                            ...prev,
                                            seriesNumber: text
                                        }))} />
                                </View>

                            </View>
                            <View>
                                <TextInput
                                    placeholder={"Prize bond number"}
                                    style={tailwind("border p-2 rounded-lg mt-6 font-bold border-green-600")}
                                    keyboardType={"number-pad"}
                                    value={bondData.bondSerial}
                                    onChangeText={handlePrizeBondNumber}
                                    editable={!bondData.disable}
                                />

                            </View>
                            <View style={tailwind("flex flex-row justify-center mt-6 ")}>
                                <TouchableOpacity
                                    style={tailwind("w-16 bg-green-600 rounded flex items-center mr-2 rounded")}
                                    disabled={bondData.disable}
                                    onPress={handleAdd}
                                >
                                    <Text style={tailwind("p-2 font-bold text-white ")} >Add</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("w-16 bg-red-600 rounded flex items-center rounded")} onPress={toggler} disabled={bondData.disable}>
                                    <Text style={tailwind("p-2 font-bold text-white ")}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={tailwind(`flex items-center justify-center ml-4 ${!bondData.disable ? "hidden" : ""}`)} >

                                    <ActivityIndicator size={"large"} color={"green"} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default AddNewModal