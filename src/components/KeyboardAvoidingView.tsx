import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}
const KeyboardAvoidingViewContainer: React.FC<Props> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
