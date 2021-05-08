import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BondCheck from '../comps/BondCheck';

const PrizeBondCheck = () => {
  const listFromStore = useSelector((state) => state.bondSerials);
  const [drawList, setDrawList] = useState([]);

  const [user, setUser] = useState('');

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
    firestore()
      .collection('draws')
      .get()
      .then((querySnapshot) => {
        let draws = [];
        querySnapshot.forEach((documentSnapshot) => {
          draws.push(JSON.parse(documentSnapshot.data()['draw']));
        });
        setDrawList(draws);
      })
      .catch((e) => {
        console.log(e);
        setDrawList([]);
      });
    return authSubscriber;
  }, []);

  useEffect(() => {}, [drawList]);

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item) => item["number"].toString()}
        data={drawList}
        renderItem={({item}) => <BondCheck draw={item} />}
      />
    </SafeAreaView>
  );
};

export default PrizeBondCheck;
