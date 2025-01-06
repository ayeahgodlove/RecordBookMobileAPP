import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {List, FAB} from 'react-native-paper';
import {useMeetingMinute} from '../../hooks/meeting-minute.hook';
import {format} from '../../utils/format';
import {theme} from '../../styles/theme';
import {htmlToText} from 'html-to-text';

interface Props {
  navigation: any;
}

const MinuteListScreen: React.FC<Props> = ({navigation}) => {
  const {meetingMinutes} = useMeetingMinute();
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          borderRadius: 5,
        }}
        data={meetingMinutes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            style={{
              backgroundColor: theme.colors.backgroundColor,
              marginBottom: 10,
            }}
            title={`${item.title} - ${format.date(item.meetingDate)}`}
            description={htmlToText(item.content)}
            onPress={() => console.log('View minute details')}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddMinute')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  fab: {position: 'absolute', right: 16, bottom: 16},
});

export default MinuteListScreen;
