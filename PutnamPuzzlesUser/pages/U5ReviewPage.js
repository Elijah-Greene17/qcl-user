import React, {useContext, useState} from 'react';
import {View, Text, Image, Pressable, TextInput} from 'react-native';
import Timer from '../components/Timer';
import MainView from '../components/MainView';
import Button from '../components/Button';
import {AppContext} from '../Contexts/AppContext';

const U5ReviewPage = ({navigation}) => {
  const [text, setText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const {questNo} = useContext(AppContext);
  const backgroundStyle = {
    backgroundColor: '#D2D2FF',
    height: '100%',
    width: '100%',
  };

  const waitingViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const waitingViewTextStyle = {
    fontSize: 30,
    textAlign: 'center',
  };

  const handleTextChange = newText => {
    setText(newText);
  };

  return (
    <MainView style={backgroundStyle}>
      {reviewSubmitted ? (
        <>
          <View style={waitingViewStyle}>
            <Text style={waitingViewTextStyle}>Thank You for Reviewing</Text>
          </View>
        </>
      ) : (
        <>
          <View style={waitingViewStyle}>
            <Text style={waitingViewTextStyle}>Please Leave a Review</Text>
          </View>
          <TextInput
            style={{
              height: 120,
              borderColor: 'gray',
              borderWidth: 1,
              padding: 10,
              width: '80%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              marginTop: '5%',
              marginBottom: '5%',
            }}
            onChangeText={handleTextChange}
            value={text}
            multiline={true}
          />
          <Button
            title={'Submit'}
            onClick={() => {
              console.log('Submit');
              setReviewSubmitted(true);
              fetch('http://localhost:3000/api/addReview', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: questNo,
                  review: text,
                }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }}
            style={{
              marginTop: '15%',
              width: '50%',
              alignSelf: 'center',
            }}
          />
        </>
      )}
    </MainView>
  );
};

export default U5ReviewPage;
