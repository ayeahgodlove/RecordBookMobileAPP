import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import {theme} from '../../styles/theme';
import {useUser} from '../../hooks/user.hook';
import Toast from 'react-native-toast-message';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';
import {buttonStyle} from '../../styles/colors';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const {addUser} = useUser();
  // const {} =

  const handleRegister = async () => {
    const obj = {
      email,
      fullname: fullName,
      username,
      phoneNumber,
      password,
    };
    const feedback = await addUser(obj);
    if (feedback) {
      Toast.show({
        type: 'success',
        text1: 'Registration successfully!',
      });
      navigation.navigate('Login');
      setSubmitting(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration failed!',
      });
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <Text style={styles.appName}>RecordBook</Text>
        <TextInput
          label="Fullname"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          disabled={isSubmitting}
        />
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          disabled={isSubmitting}
        />
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
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          disabled={isSubmitting}
        />

        <Button
          style={buttonStyle}
          mode="contained"
          onPress={handleRegister}
          disabled={isSubmitting}
          loading={isSubmitting}>
          Register
        </Button>

        {/* Links */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign In</Text>
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
    backgroundColor: theme.colors.backgroundColor,
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

export default RegisterScreen;
