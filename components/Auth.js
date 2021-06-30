import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';
import { signupUser, signinUser, } from '../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window')

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState('signin');
  const { loading } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const Authenticate = () => {
    if (auth == 'signin') {
      dispatch(signinUser({ email, password }));
    } else {
      dispatch(signupUser({ email, password }));

    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loading && (
        <ActivityIndicator
          size={'large'}
          color="#6cbab8"
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        />
      )}
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Please {auth} !!</Text>
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={e => setEmail(e)}
        placeholder="Enter your emial"
        placeholderTextColor="grey"
        underlineColorAndroid="#6cbab8"
        style={styles.txtInput}
      />
      <TextInput
        value={password}
        secureTextEntry
        onChangeText={e => setPassword(e)}
        placeholder="Enter your password"
        placeholderTextColor="grey"
        underlineColorAndroid="#6cbab8"
        style={styles.txtInput}
      />

      {auth == 'signin' ? (
        <TouchableOpacity
          onPress={() => setAuth('signup')}
          style={styles.already2}>
          <Text style={styles.already}>Don't have an account ?</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setAuth('signin')}
          style={styles.already2}>
          <Text style={styles.already}>Already have an account.</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => Authenticate()} style={styles.auth}>
        <Text>{auth}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  auth: {
    backgroundColor: '#6cbab8',
    height: 40,
    paddingHorizontal: 50,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  already: {
    textAlign: 'center',
    fontSize: 18,
  },
  already2: {
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  error: {
    color: 'tomato',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 50,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  txtInput: {
    width: width - 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: '#6cbab8',
    color: 'black',
  },
});
