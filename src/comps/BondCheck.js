import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';
import {IconButton, Colors} from 'react-native-paper';
import {HumanReadable} from '../comps/utils';
import {useSelector} from 'react-redux';
import {CrossProduct, JoinS, FindPrize} from '../prizelogic';

const BondCheck = ({draw}) => {
  const allBondSerials = useSelector((state) =>
    state.bondSerials.map((item) => item.bondSerial),
  );

  const [prizeList, setPrizeList] = useState([]);
  const [firstTime, setfirstTime] = useState(true);

  const handleCheck = async () => {
    setfirstTime(false);
    const series_got_prizes = draw['series_got_prizes'];

    const prizes = [].concat(
      await FindPrize(
        1,
        await JoinS(await CrossProduct(series_got_prizes, draw['first'])),
        allBondSerials,
      ),
      await FindPrize(
        2,
        await JoinS(await CrossProduct(series_got_prizes, draw['second'])),
        allBondSerials,
      ),
      await FindPrize(
        3,
        await JoinS(await CrossProduct(series_got_prizes, draw['third'])),
        allBondSerials,
      ),
      await FindPrize(
        4,
        await JoinS(await CrossProduct(series_got_prizes, draw['fourth'])),
        allBondSerials,
      ),
      await FindPrize(
        5,
        await JoinS(await CrossProduct(series_got_prizes, draw['fifth'])),
        allBondSerials,
      ),
    );
    setPrizeList(prizes);
  };
  return (
    <View
      style={tailwind('bg-yellow-50 rounded-lg mt-2 mb-2 px-2 py-2 flex mx-2')}>
      <Text style={tailwind('border-b border-yellow-800 text-lg py-1 mb-2')}>
        Draw No: {draw['number']}
      </Text>
      <Text style={tailwind('text-sm mb-4')}>{draw['summary_text']}</Text>
      <View style={tailwind('flex flex-row justify-center')}>
        <IconButton
          icon="check-decagram"
          color={Colors.green500}
          size={firstTime ? 40 : 0}
          disabled={!firstTime}
          onPress={() => handleCheck()}
        />
      </View>

      <FlatList
        data={prizeList}
        keyExtractor={(item) => item.bondSerial}
        renderItem={({item}) => (
          <GotPrize
            prizeNumber={item.prizeNumber}
            bondSerial={item.bondSerial}
          />
        )}
      />
    </View>
  );
};

const Tapos = ({msg}) => {
  return (
    <View
      style={tailwind(
        'w-full border-t pt-4 pb-4 border-green-600 flex flex-row justify-center',
      )}>
      <Text>{msg}</Text>
    </View>
  );
};

const GotPrize = ({prizeNumber, bondSerial}) => {
  return (
    <View style={tailwind('w-full mb-4 border-b border-yellow-700 py-1')}>
      <Text style>
        <Text style={tailwind('text-lg')}>Prize: </Text>
        <Text style={tailwind('text-xl')}>{prizeNumber}</Text>
      </Text>
      <Text >
        <Text style={tailwind('text-lg ')}>Bond Serial: </Text>
        <Text style={tailwind('text-xl ')}>{HumanReadable(bondSerial)}</Text>
      </Text>
    </View>
  );
};
export default BondCheck;
