import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, RadioButton, Text} from 'react-native-paper';
import SelectInput from '../../components/SelectInput';
import {useAuthentication} from '../../hooks/auth.hook';
import {useFinancialRecord} from '../../hooks/financial-record.hook';
import {
  emptyFinancialRecord,
  IFinancialRecord,
} from '../../models/financial-record';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';
import {buttonStyle} from '../../styles/colors';
import {useRecordType} from '../../hooks/record-type.hook';
import {fetchRecordTypesAsync} from '../../redux/slices/record-type.slice';
import {RECORD_TYPE} from '../../constants/constant';
import {useExpenseType} from '../../hooks/expense-type.hook';
import {useIncomeType} from '../../hooks/income-type.hook';
import {fetchIncomeTypesAsync} from '../../redux/slices/income-type.slice';
import {fetchExpenseTypesAsync} from '../../redux/slices/expense-type.slice';

interface Props {
  navigation: any;
}
const AddFinancialRecordScreen: React.FC<Props> = ({navigation}) => {
  const [expenseType, setExpenseType] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [amount, setAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [recordType, setRecordType] = useState('');

  const {user} = useAuthentication();
  const {expenseTypes} = useExpenseType();
  const {incomeTypes} = useIncomeType();
  const {recordTypes, getRecordType} = useRecordType();
  const {addFinancialRecord} = useFinancialRecord();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [recordTypeOption, setRecordTypeOption] = useState('');

  const handleRecordType = (option: string) => {
    setRecordType(option);
  };

  const handleAdd = async () => {
    setSubmitting(true);
    const obj: IFinancialRecord = {
      ...emptyFinancialRecord,
      amount: Number(amount),
      description,
      createdBy: user?.id ?? '',
      expenseTypeId: expenseType,
      incomeTypeId: incomeType,
      recordTypeId: recordType
    };
    const feedback = await addFinancialRecord(obj);
    if (feedback) {
      Toast.show({
        type: 'success',
        text1: 'Record added successfully',
      });
      navigation.navigate('TabNavigation', {
        screen: 'Financial', // Specify the screen inside MainNavigator
      });
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
    dispatch(fetchRecordTypesAsync() as any);
    dispatch(fetchIncomeTypesAsync() as any);
    dispatch(fetchExpenseTypesAsync() as any);

    const selectRecord = getRecordType(recordType);
    setRecordTypeOption(selectRecord.name);
  }, [recordType, recordTypeOption]);
  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <RadioButton.Group onValueChange={handleRecordType} value={recordType}>
          <Text variant="bodyLarge">Select Record Type</Text>
          {recordTypes.map(option => {
            return (
              <View
                key={option.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton value={option.id} />
                <Text>{option.name}</Text>
              </View>
            );
          })}
        </RadioButton.Group>
        {recordTypeOption === RECORD_TYPE.INCOME ? (
          <SelectInput
            label="Select income type"
            options={incomeTypes.map(income => {
              return {
                label: income.name,
                value: income.id,
              };
            })}
            value={incomeType}
            onValueChange={value => setIncomeType(value)}
          />
        ) : (
          <SelectInput
            label="Select expense type"
            options={expenseTypes.map(expense => {
              return {
                label: expense.name,
                value: expense.id,
              };
            })}
            value={expenseType}
            onValueChange={value => setExpenseType(value)}
          />
        )}

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
        <Button
          icon={'content-save'}
          style={buttonStyle}
          mode="contained"
          onPress={handleAdd}
          loading={isSubmitting}>
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
