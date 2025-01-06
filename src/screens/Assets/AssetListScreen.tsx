import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {List, FAB, Text} from 'react-native-paper';
import {useAsset} from '../../hooks/asset.hook';
import {format} from '../../utils/format';
import {theme} from '../../styles/theme';

interface Props {
  navigation: any;
}
const AssetListScreen: React.FC<Props> = ({navigation}) => {
  const {assets} = useAsset();
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          borderRadius: 5,
        }}
        data={assets}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            style={{
              backgroundColor: theme.colors.backgroundColor,
              marginBottom: 10,
              borderLeftColor: '#08090a',
              borderLeftWidth: 10,
              borderRadius: 5,
            }}
            title={`${item.name.toLocaleUpperCase()}: ${format.number(
              item.value,
            )} XAF`}
            description={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center', // Ensures vertical alignment
                }}>
                <Text style={{fontSize: 15, flex: 1}}>
                  {item.description +
                    '. Acquired on the ' +
                    format.date(item.acquireDate)}
                </Text>{' '}
                <Text
                  style={{
                    color: theme.colors.tertiary,
                    fontSize: 15,
                    textAlign: 'right',
                    marginLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {item.status}
                </Text>{' '}
              </View>
            }
            onPress={() => console.log('View asset details')}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddAsset')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  fab: {position: 'absolute', right: 16, bottom: 16},
});

export default AssetListScreen;
