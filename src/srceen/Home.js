import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tailwind from 'tailwind-rn';
import AddNewModal from '../comps/AddNewModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useSelector} from 'react-redux';

const ViewTot = ({iconName, titleText, dataText}) => (
  <View style={tailwind('text-gray-800 mb-2')}>
    <View style={tailwind('flex flex-row items-center justify-center')}>
      <Icon name={iconName} size={26} color={'#FBBF24'} />
      <Text style={{...tailwind('text-lg'), color: '#F59E0B'}}>
        {titleText}:{' '}
        <Text style={tailwind('font-normal text-2xl')}>{dataText}</Text>
      </Text>
    </View>
  </View>
);
const Home = ({navigation}) => {
  const state = useSelector((state) => state);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const keyboardToggler = () => setKeyboardShow((prev) => !prev);

  return (
    <ScrollView style={tailwind('h-full bg-white')}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCD34D" />
      <View
        style={tailwind('flex w-full justify-center items-center mt-4 mb-4')}>
        <Image
          source={require('../../assets/img/logo.png')}
          style={{width: 50, height: 50, marginBottom: 2}}
          resizeMode={'contain'}
        />
        <Image
          source={require('../../assets/img/prizebond_text.png')}
          resizeMode={'contain'}
          style={{width: 200, height: 44}}
        />
      </View>
      <View style={tailwind('flex w-full px-4')}>
        <TouchableOpacity
          style={tailwind('flex flex-row justify-end mb-6')}
          onPress={keyboardToggler}>
          <Text style={tailwind('bg-yellow-400 rounded-full')}>
            <Icon name="plus" size={40} color={'white'} />
          </Text>
        </TouchableOpacity>
        <View style={tailwind('p-2 rounded bg-yellow-200 mb-2')}>
          <Text style={tailwind('text-gray-800')}>
            Hello user, Thank you for downloading our apps! Tap + icon to add
            prize bonds.
          </Text>
        </View>

        <View
          style={tailwind('p-2 rounded flex justify-center items-center mt-4')}>
          <ViewTot iconName={'handball'} titleText={'Totals'} dataText={state.totalBondSerials} />
          <ViewTot
            iconName={'basketball-hoop-outline'}
            titleText={'Total draws'}
            dataText={2}
          />
        </View>
      </View>

      <AddNewModal isVisibleP={keyboardShow} togglerP={keyboardToggler} />
    </ScrollView>
  );
};

export default Home;
