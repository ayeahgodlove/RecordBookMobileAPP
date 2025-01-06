import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {List, FAB, Text} from 'react-native-paper';
import {useFinancialRecord} from '../../hooks/financial-record.hook';
import {format} from '../../utils/format';
import {theme} from '../../styles/theme';
import {useCategory} from '../../hooks/category.hook';
import {useDashboard} from '../../hooks/custom/home.hook';
import Loader from '../../components/Loader';
interface Props {
  navigation: any;
}
const FinancialListScreen: React.FC<Props> = ({navigation}) => {
  const {financialRecords} = useFinancialRecord();
  const {getCategoryName} = useCategory();

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          borderRadius: 5,
        }}
        data={financialRecords}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            style={{backgroundColor: theme.colors.backgroundColor, marginBottom: 10,
              borderLeftColor: '#3b49df',
              borderLeftWidth: 10,
              borderRadius: 5
            }}
            title={`${item.type.toLocaleUpperCase()}: ${format.number(
              item.amount,
            )} XAF`}
            description={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center', // Ensures vertical alignment
                }}>
                <Text style={{fontSize: 15, flex: 1}}>{item.description}</Text>{' '}
                <Text
                  style={{
                    color: theme.colors.tertiary,
                    fontSize: 12,
                    textAlign: 'right',
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {getCategoryName(item.categoryId).toLocaleUpperCase()}
                </Text>{' '}
              </View>
            }
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
  container: {flex: 1, padding: 16},
  fab: {position: 'absolute', right: 16, bottom: 16},
});

export default FinancialListScreen;
