import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import ButtonComponent from '../../components/Button';
import { theme } from '../../styles/theme';


interface Props {
  navigation: any
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    console.log('Register user:', {name, email, password});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>RecordBook</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
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
        title="Register"
        mode="contained"
        onPress={handleRegister}
      />

      {/* Links */}
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Sign In</Text>
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
