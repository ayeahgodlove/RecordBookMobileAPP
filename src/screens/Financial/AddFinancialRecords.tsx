import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const AddFinancialRecordScreen = () => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    console.log('Add financial record:', {category, type, amount, description});
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Category (Offering/Tithe/Donation/Thanksgiving)"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TextInput
        label="Type (Income/Expense)"
        value={type}
        onChangeText={setType}
        style={styles.input}
      />
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAdd}>
        Add Record
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {marginBottom: 16},
});

export default AddFinancialRecordScreen;
