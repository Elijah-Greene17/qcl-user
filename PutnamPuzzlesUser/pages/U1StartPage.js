import { View, Text, Image, Pressable, TextInput } from 'react-native';
import Button from '../components/Button';

import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Spacer from '../components/Spacer';
import { useState, useEffect } from 'react';
import Lobby from '../components/Lobby';

import { initializeApp } from "firebase/app"
import { getDatabase, onValue, ref, set, get, child } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q",
  authDomain: "quietcornerquests.firebaseapp.com",
  projectId: "quietcornerquests",
  storageBucket: "quietcornerquests.appspot.com",
  messagingSenderId: "170321202795",
  appId: "1:170321202795:web:ee95b6d259360368fc6b2e",
  measurementId: "G-0RJ6VZ0546"
}


const U1StartPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userInd, setUserInd] = useState(0)


  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const db = getDatabase()
    const usersIndexRef = ref(db, 'app/userIndex/value')

    // when a user is added or removed
    onValue(usersIndexRef, (snapshot) => {
      const data = snapshot.val();
      setUserInd(data)
      console.log(data)
    })
  }, [])

  const handleNameChange = (text) => {
    setName(text);
  };
  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const submitPlayerInfo = () => {
    const app = initializeApp(firebaseConfig)
    const db = getDatabase()

    set(ref(db, 'app/users/' + (userInd || 0)), {
      Name: name,
      Phone: phoneNumber,
    });
    set(ref(db, 'app/userIndex'), {
      value: userInd + 1,
    });
    // console.log(name)
    // console.log(phoneNumber)
    // get(db, 'app/userIndex/value').then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log("EG: ", snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    navigation.replace('U2');
  }

  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  const formStyle = {
    height: '30%',
    width: '100%',
  }

  const labelStyle = {
    textAlign: 'center',
    width: '100%',
    fontSize: 20
  }
  const textInputViewStyle = {
    marginTop: '1%',
    height: '15%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  }
  const textInputStyle = {
    fontSize: 20,
    textAlign: 'center',
    width: '60%',
    backgroundColor: '#fff'
  }

  return (
    // Header: 25%; Timer: 15%, Form: 35%, Button: 20%
    <MainView style={backgroundStyle}>
      <Timer />
      {/* <Spacer height={'30%'} /> */}
      <View style={formStyle}>
        <Text style={labelStyle}>Name</Text>
        <View style={textInputViewStyle}>
          <TextInput
            style={textInputStyle}
            onChangeText={handleNameChange}
            value={name}
          />
        </View>
        <Spacer height="10%" />
        <Text style={labelStyle}>Phone Number</Text>
        <View style={textInputViewStyle}>
          <TextInput
            style={textInputStyle}
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
          />
        </View>
      </View>
      <Button
        title={'Submit'}
        onClick={submitPlayerInfo}
      />
    </MainView>
  );
};

export default U1StartPage;
