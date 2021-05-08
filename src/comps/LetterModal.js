import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import {Dimensions, Text, TouchableOpacity, View} from 'react-native'
import tailwind from 'tailwind-rn'

const LetterModal = ({ isVisible, togglerHandler }) => {
    const toggler = (letter) => {
        if (togglerHandler) {
            togglerHandler(letter)
        }
    }
    useEffect(() => {

    }, [isVisible])

    const { height, width } = Dimensions.get('screen')
    const letters = [
        ["ক", "খ", "গ", "ঘ", "ঙ"],
        ["চ", "ছ", "জ", "ঝ", "ঞ"],
        ["ট", "ঠ", "ড", "ঢ", "ণ"],
        ["ত", "থ", "দ", "ধ", "ন"],
        ["প", "ফ", "ব", "ভ", "ম"],
        ["য", "র", "ল", "শ", "ষ"],
        ["স", "হ", "ঢ়", "য়"],
    ]
    return (
        <View style={{ flex: 1 }}>

            <Modal
                isVisible={isVisible}
                useNativeDriver={true}
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: (height / 2) - 40,
                    marginBottom: 0
                }}
                deviceHeight={height}
            >
                <View style={tailwind("bg-green-100 rounded-tr rounded-tl-lg rounded-tr-lg flex")}>
                    <View>
                        <View style={{...tailwind("h-full flex justify-between  pb-16 mb-8 pt-2"),width:width,overflow:"hidden"}}>

                            {letters.map(blocLetters =>

                                <View key={blocLetters.toString()} style={tailwind("flex flex-row justify-between")}>
                                    {blocLetters.map(letter =>
                                        <TouchableOpacity
                                            key={letter}
                                            onPress={() => {
                                                toggler(letter)
                                            }}
                                            style={tailwind("w-16 px-2 flex")}
                                        >
                                            <Text

                                                style={tailwind("w-full py-1 bg-green-500 text-center font-bold rounded-lg text-white")}
                                            >
                                                {letter}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


export default LetterModal