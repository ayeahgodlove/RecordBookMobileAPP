import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {List, Button, FAB} from 'react-native-paper';

const data = [
  {id: '1', type: 'Income', amount: '1000', description: 'Donation'},
  {id: '2', type: 'Expense', amount: '500', description: 'Maintenance'},
];

interface Props {
  navigation: any;
}
const FinancialListScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            title={`${item.type}: $${item.amount}`}
            description={item.description}
            onPress={() => console.log('View details')}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddFinancialRecord')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  fab: {position: 'absolute', right: 16, bottom: 16},
});

export default FinancialListScreen;
