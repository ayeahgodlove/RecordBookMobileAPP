import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import ButtonComponent from '../../components/Button';
import {theme} from '../../styles/theme';
import {authService} from '../../services/auth.service';
import {useAuthentication} from '../../hooks/auth.hook';
import {useDispatch} from 'react-redux';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';
import {buttonStyle} from '../../styles/colors';
// import { useNavigation } from '@react-navigation/native';

interface Props {
  navigation: any;
}
const LoginScreen: React.FC<Props> = ({navigation}) => {
  // const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isAuthenticated, isLoading, getUserLogins} = useAuthentication();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleFunction = async () => {
    setSubmitting(true);
    await getUserLogins(email, password, navigation);
    setSubmitting(false);
    console.log('test...', email, password);
  };
  useEffect(() => {}, [isAuthenticated, isLoading]);

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <Text style={styles.appName}>RecordBook</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          disabled={isSubmitting}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          disabled={isSubmitting}
        />
        <Button
          style={buttonStyle}
          mode="contained"
          onPress={handleFunction}
          loading={isSubmitting}
          disabled={isSubmitting}>
          Login
        </Button>

        {/* Links */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingViewContainer>
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
