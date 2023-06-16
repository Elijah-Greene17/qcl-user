import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, Text, Image, Pressable, TextInput, AppState} from 'react-native';
import Timer from '../components/Timer';
import MainView from '../components/MainView';

import {AppContext} from '../Contexts/AppContext';
import Button from '../components/Button';
import Spacer from '../components/Spacer';

import {initializeApp} from 'firebase/app';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import {firebaseConfig} from '../components/firebaseConfig';
import SubButton from '../components/SubButton';

const U3QuestPage = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [time, setTime] = useState(0);
  const [hintTimeLeft, setHintTimeLeft] = useState(0);
  const [hintTimeLeftString, setHintTimeLeftString] = useState('TLS');
  const [completed, setCompleted] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [showErrorCode, setShowErrorCode] = useState(false);
  const [completionIsFocused, setCompletionIsFocused] = useState(false);

  const {
    timerEndTime,
    code,
    userCode,
    setUserCode,
    userName,
    setUserName,
    phone,
    hintStatus,
    hintCooldown,
  } = useContext(AppContext);

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

  const labelStyle = {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
  };
  const textInputViewStyle = {
    marginTop: '1%',
    height: 45,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  };
  const textInputStyle = {
    fontSize: 20,
    textAlign: 'center',
    width: '60%',
    backgroundColor: '#fff',
  };
  const hintStyle = {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '5%',
    width: '80%',
  };
  const confirmStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5%',
  };

  const handleHint = () => {
    console.log('handleHint');
    // connect to db
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    set(ref(db, 'app/hint/by'), userName);
    set(ref(db, 'app/hint/status'), 'Active');
  };

  const handleCodeSubmition = () => {
    console.log('handleCodeSubmition');
    console.log(enteredCode);

    if (userCode.length > 0 && userCode != code && enteredCode.length > 0) {
      setEnteredCode('');
      setShowErrorCode(true);
    }

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    set(ref(db, 'app/code/userEntered'), enteredCode.toUpperCase());
  };

  const updateHintTimer = async () => {
    console.log('updateHintTimer');
    let timeLeft = hintCooldown - Date.now();
    const minutes = Math.floor(timeLeft / 60000);
    timeLeft -= minutes * 60000;
    const seconds = Math.floor(timeLeft / 1000);
    if (seconds < 10) {
      setHintTimeLeftString(minutes + ':0' + seconds);
    } else {
      setHintTimeLeftString(minutes + ':' + seconds);
    }

    await setTimeout(() => {
      setHintTimeLeft(timeLeft);
    }, 1000);
  };

  // useEffect(() => {
  //   console.log('App State Listener Activated');
  //   const currentTime = Date.now();
  //   let timeRemaining = timerEndTime - currentTime;
  //   setTime(timeRemaining);
  // }, [AppState.currentState]);

  useEffect(() => {
    console.log('hintStatus', hintStatus);
    console.log('confirm', confirm);
  }, [confirm]);

  useEffect(() => {
    console.log('timerEndTime', timerEndTime);
    // Calculate Time Remaining
    const currentTime = Date.now();
    let timeRemaining = timerEndTime - currentTime;
    setTime(timeRemaining);

    // count down timer
    const timer = setInterval(() => {
      console.log(timeRemaining);
      if (timeRemaining > 0 && !completed) {
        console.log('Completed: ', completed);
        timeRemaining = timerEndTime - Date.now();
        setTime(timeRemaining);
      } else {
        // if (time <= 0) {
        //   fetch('https://qcq-dd80551a4b64.herokuapp.com/api/notification', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       message: `The Time has expired for the Quest!`,
        //     }),
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log('Success:', data);
        //     })
        //     .catch(error => {
        //       console.error('Error:', error);
        //     });
        // }
        clearInterval(timer);
      }
    }, 1000);

    if (completed) {
      console.log('Completed!');
      fetch('https://qcq-dd80551a4b64.herokuapp.com/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `The Team has completed the Quest!`,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    return () => clearInterval(timer);
  }, [timerEndTime, completed]);

  useEffect(() => {
    if (enteredCode.length > 0) {
      console.log('Code Subitted: ', userCode);
      console.log('Acutal Code: ', code);
    }
    if (userCode == code) {
      setCompleted(true);
    }
  }, [userCode]);

  useEffect(() => {
    console.log('Hint Time Left String');
    if (hintStatus == 'Inactive' && hintCooldown > Date.now()) {
      updateHintTimer();
    }
  }, [hintTimeLeft, hintCooldown]);

  useEffect(() => {
    if (showErrorCode) {
      setTimeout(() => {
        setShowErrorCode(false);
      }, 7000);
    }
  }, [showErrorCode]);

  useEffect(() => {
    // if (time <= 0) {
    //   fetch('https://qcq-dd80551a4b64.herokuapp.com/api/notification', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       message: `The Time has expired for the Quest!`,
    //     }),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Success:', data);
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }
  }, [time]);

  return (
    <MainView style={backgroundStyle}>
      {!completionIsFocused && (
        <>
          <Timer isRunning={true} startTime={time} />
          <Spacer height={'10%'} />
        </>
      )}

      {time <= 0 ? (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={hintStyle}>
              The Quest Duration Time has expired! Please Return to the starting
              point to meet with your host
            </Text>
          </View>
          <Spacer height={'10%'} />
          <Button
            title={'Leave a Review'}
            onClick={() => {
              const app = initializeApp(firebaseConfig);
              const db = getDatabase(app);
              set(ref(db, 'app/currentState'), 'Review');
            }}
          />
        </>
      ) : (
        <>
          {hintStatus == 'Inactive' && !confirm && (
            <>
              {!completionIsFocused && (
                <>
                  {hintCooldown < Date.now() || hintCooldown == 0 ? (
                    <Button
                      title={'Request Hint'}
                      onClick={() => {
                        setConfirm(!confirm);
                      }}
                    />
                  ) : (
                    // <Text style={hintStyle}>
                    //   Next hint available in {hintTimeLeftString}
                    // </Text>
                    <Button
                      title={`Next Hint ${hintTimeLeftString}`}
                      onClick={() => {}}
                      backgroundColor="lightgray"
                    />
                  )}
                </>
              )}
            </>
          )}

          {hintStatus == 'Active' && !confirm && (
            <>
              <Spacer height={'5%'} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={hintStyle}>Hint Requested</Text>
              </View>
            </>
          )}

          {confirm && (
            <View>
              <Spacer height={'5%'} />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={hintStyle}>Are you sure you want a hint?</Text>
              </View>
              <View style={confirmStyle}>
                {/* <Pressable
                  onPress={() => {
                    handleHint();
                    setConfirm(false);
                  }}>
                  <Text>Yes</Text>
                </Pressable> */}
                <SubButton
                  title={'Yes'}
                  onClick={() => {
                    console.log('EG: ', userName);
                    console.log('EG: ', phone);
                    const numbersOnlyPhoneNumber = phone.replace(/\D/g, '');
                    fetch(
                      'https://qcq-dd80551a4b64.herokuapp.com/api/notification',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          message: `${userName} has requested a hint! +1${numbersOnlyPhoneNumber}`,
                        }),
                      },
                    )
                      .then(response => response.json())
                      .then(data => {
                        console.log('Success:', data);
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
                    handleHint();
                    setConfirm(false);
                  }}
                />
                <View style={{width: '10%'}} />
                <SubButton
                  title={'No'}
                  onClick={() => {
                    setConfirm(false);
                  }}
                />
              </View>
            </View>
          )}

          {completed ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={hintStyle}>
                  Congratulations! Stay put – your host will meet with you in a
                  moment.
                </Text>
              </View>
              <Spacer height={'40%'} />
              <Button
                title={'Leave a Review'}
                onClick={() => {
                  const app = initializeApp(firebaseConfig);
                  const db = getDatabase(app);
                  set(ref(db, 'app/currentState'), 'Review');
                }}
              />
            </>
          ) : (
            <>
              {showErrorCode ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={hintStyle}>
                    Sorry, the Completion Code is Incorrect
                  </Text>
                </View>
              ) : (
                <Text style={labelStyle}>Enter Quest Completion Code</Text>
              )}
              <View style={textInputViewStyle}>
                <TextInput
                  style={textInputStyle}
                  autoCapitalize={'characters'}
                  onFocus={() => {
                    setCompletionIsFocused(true);
                  }}
                  onBlur={() => {
                    setCompletionIsFocused(false);
                  }}
                  onChangeText={text => {
                    setEnteredCode(text);
                    if (text.length == 0) {
                      const app = initializeApp(firebaseConfig);
                      const db = getDatabase(app);
                      set(ref(db, 'app/code/userEntered'), '');
                    }
                  }}
                  value={enteredCode}
                />
              </View>
              <Spacer height={'5%'} />

              {completionIsFocused && (
                <Button title={'Submit Code'} onClick={handleCodeSubmition} />
              )}
            </>
          )}
        </>
      )}
    </MainView>
  );
};

export default U3QuestPage;
