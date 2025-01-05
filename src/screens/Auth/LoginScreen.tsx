import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import ButtonComponent from '../../components/Button';
import {theme} from '../../styles/theme';
import {authService} from '../../services/auth.service';
import {useAuthentication} from '../../hooks/auth.hook';
import {useDispatch} from 'react-redux';
// import { useNavigation } from '@react-navigation/native';

interface Props {
  navigation: any;
}
const LoginScreen: React.FC<Props> = ({navigation}) => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isAuthenticated, isLoading, getUserLogins} = useAuthentication();

  const handleFunction = () => {
    getUserLogins(email, password, navigation);
  };
  useEffect(() => {}, [isAuthenticated, isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>RecordBook</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <ButtonComponent
        title="Login"
        mode="contained"
        onPress={handleFunction}
      />

      {/* Links */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  linkText: {
    color: theme.colors.accent,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
