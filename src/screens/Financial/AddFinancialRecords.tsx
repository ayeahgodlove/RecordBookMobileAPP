import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Menu} from 'react-native-paper';
import SelectInput from '../../components/SelectInput';
import {useAuthentication} from '../../hooks/auth.hook';
import {useCategory} from '../../hooks/category.hook';
import {useFinancialRecord} from '../../hooks/financial-record.hook';
import {
  emptyFinancialRecord,
  IFinancialRecord,
} from '../../models/financial-record';
import Toast from 'react-native-toast-message';
import {fetchCategoriesAsync} from '../../redux/slices/category.slice';
import {useDispatch} from 'react-redux';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';

const options = [
  {label: 'Income', value: 'income'},
  {label: 'Expense', value: 'expense'},
];

interface Props {
  navigation: any;
}
const AddFinancialRecordScreen: React.FC<Props> = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const {user} = useAuthentication();
  const {categories} = useCategory();
  const {addFinancialRecord} = useFinancialRecord();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleAdd = async () => {
    setSubmitting(true);
    const obj: IFinancialRecord = {
      ...emptyFinancialRecord,
      categoryId: category,
      type,
      amount: Number(amount),
      description,
      createdBy: user?.id ?? '',
    };
    const feedback = await addFinancialRecord(obj);
    if (feedback) {
      Toast.show({
        type: 'success',
        text1: 'Record added successfully',
      });
      navigation.navigate('FinancialList');
      setSubmitting(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Operation failed!',
      });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, []);
  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <SelectInput
          label="Select a type"
          options={options}
          value={type}
          onValueChange={value => setType(value)}
        />

        <SelectInput
          label="Select a category"
          options={categories.map(cat => {
            return {
              label: cat.name,
              value: cat.id,
            };
          })}
          value={category}
          onValueChange={value => setCategory(value)}
          // disabled={isSubmitting}
        />

        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          keyboardType="numeric"
          disabled={isSubmitting}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          disabled={isSubmitting}
          multiline
        />
        <Button mode="contained" onPress={handleAdd} loading={isSubmitting}>
          Add Record
        </Button>
      </View>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, marginTop: 25},
  input: {marginBottom: 16},
});

export default AddFinancialRecordScreen;
