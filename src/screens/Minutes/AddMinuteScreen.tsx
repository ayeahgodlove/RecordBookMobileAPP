import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TextInput, Button, Text} from 'react-native-paper';
import {useMeetingMinute} from '../../hooks/meeting-minute.hook';
import {emptyMeetingMinute, IMeetingMinute} from '../../models/meeting-minute';
import {useAuthentication} from '../../hooks/auth.hook';
import Toast from 'react-native-toast-message';
import KeyboardAvoidingViewContainer from '../../components/KeyboardAvoidingView';
import RichEditor from '../../components/RichEditor';
import {buttonStyle} from '../../styles/colors';

interface Props {
  navigation: any;
}

const AddMinuteScreen: React.FC<Props> = ({navigation}) => {
  let richTextRef: any = useRef();

  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState(
    'Clear this text and start typing...',
  );
  const [date, setDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {addMeetingMinute} = useMeetingMinute();
  const {user} = useAuthentication();
  const handleAdd = async () => {
    setSubmitting(true);
    const obj: IMeetingMinute = {
      ...emptyMeetingMinute,
      content: description,
      createdBy: user?.id ?? '',
      meetingDate: date,
      title: topic,
    };
    const feedback = await addMeetingMinute(obj);
    if (feedback) {
      Toast.show({
        type: 'success',
        text1: 'Record added successfully',
      });
      navigation.navigate('TabNavigation', {
        screen: 'Minutes', // Specify the screen inside MainNavigator
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
          label="Title"
          value={topic}
          onChangeText={setTopic}
          style={styles.input}
          disabled={isSubmitting}
        />
        <RichEditor
          descHTML={description}
          setDescHTML={setDescription}
        />

        <TextInput
          label="Meeting Date"
          value={date.toDateString()}
          onPress={() => setOpen(true)}
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
          Add Minute
        </Button>
      </View>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  input: {marginBottom: 16},
});

export default AddMinuteScreen;
