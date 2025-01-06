import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import SelectInput from '../../components/SelectInput';
import {useAsset} from '../../hooks/asset.hook';
import {emptyAsset, IAsset} from '../../models/asset';
import {useAuthentication} from '../../hooks/auth.hook';
import Toast from 'react-native-toast-message';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';
import {buttonStyle} from '../../styles/colors';

const options = [
  {label: 'Available', value: 'Available'},
  {label: 'Decommissioned', value: 'Decommissioned'},
  {label: 'Assigned', value: 'Assigned'},
];

interface Props {
  navigation: any;
}
const AddAssetScreen: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('0');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available');
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {addAsset} = useAsset();
  const {user} = useAuthentication();

  const handleAdd = async () => {
    setSubmitting(true);
    const obj: IAsset = {
      ...emptyAsset,
      status,
      value: Number(value),
      description,
      createdBy: user?.id ?? '',
      acquireDate: date,
      name,
    };
    const feedback = await addAsset(obj);
    if (feedback) {
      Toast.show({
        type: 'success',
        text1: 'Record added successfully',
      });
      navigation.navigate('TabNavigation', {
        screen: 'Assets', // Specify the screen inside MainNavigator
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

  return (
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <TextInput
          label="Asset Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          disabled={isSubmitting}
        />

        <TextInput
          label="Value"
          value={value}
          onChangeText={setValue}
          style={styles.input}
          keyboardType="numeric"
          disabled={isSubmitting}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
          disabled={isSubmitting}
        />

        <SelectInput
          label="Select status"
          options={options}
          value={status}
          onValueChange={value => setStatus(value)}
        />

        <TextInput
          label="Acquired Date"
          value={date.toDateString()}
          onPress={() => setOpen(true)}
          // onChangeText={setDescription}
          style={styles.input}
          disabled={isSubmitting}
        />
        {open && (
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={selectedDate => {
              setOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        )}

        <Button
          icon={'content-save'}
          style={buttonStyle}
          mode="contained"
          onPress={handleAdd}
          loading={isSubmitting}>
          Add Asset
        </Button>
      </View>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {marginBottom: 16},
});

export default AddAssetScreen;
