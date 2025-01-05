import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Card, DataTable, Text, useTheme} from 'react-native-paper';
import {useDashboard} from '../hooks/custom/home.hook';
import {useAuthentication} from '../hooks/auth.hook';
import Loader from '../components/Loader';
import {format} from '../utils/format';

interface Props {
  navigation: any;
}
const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {financialStats, assetStats, meetingStats, isGlobalLoading} =
    useDashboard();
  const {user} = useAuthentication();
  const theme = useTheme();

  if (isGlobalLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title={
            <Text
              variant="titleLarge"
              style={{
                color: theme.colors.outline,
                fontSize: 18,
              }}>
              Welcome back {user?.fullname}!
            </Text>
          }
        />
      </Card>

      {/* Financial Summary */}
      <Card style={styles.card} mode="contained">
        <Card.Title
          title={
            <Text
              variant="titleLarge"
              style={{
                color: theme.colors.primary,
                fontSize: 18,
              }}>
              Financial Summary
            </Text>
          }
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text variant="titleSmall">Total Expenses</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text variant="titleSmall">Total Income</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text variant="titleSmall">Balance</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>
                {format.number(financialStats.totalExpense) + " XAF"}
              </DataTable.Cell>
              <DataTable.Cell>
                {format.number(financialStats.totalIncome) + " XAF"}
              </DataTable.Cell>
              <DataTable.Cell>
                {format.number(financialStats.totalAmount) + " XAF"}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      {/* Assets Overview */}
      <Card style={styles.card}>
        <Card.Title title="Assets Overview" />
        <Card.Content>
          <Text>Registered Assets:{assetStats.count}</Text>
          <Text>Estimated Value:{assetStats.estimatedValue}</Text>
        </Card.Content>
      </Card>

      {/* Meeting Highlights */}
      <Card style={styles.card}>
        <Card.Title title="Meeting Highlights" />
        <Card.Content>
          <Text>Last Meeting: {meetingStats.lastMeetingDate}</Text>
          <Text>Total Meetings This Month: {meetingStats.totalMeetings}</Text>
        </Card.Content>
      </Card>

      {/* Recent Activities */}
      {/* <Card style={styles.card}>
        <Card.Title title="Recent Activities" />
        <Card.Content>
          <Text>1. Donation Received: $1,000 (Dec 30, 2024)</Text>
          <Text>2. Maintenance Expense: $500 (Dec 29, 2024)</Text>
          <Text>3. Meeting on Strategy Planning (Dec 28, 2024)</Text>
        </Card.Content>
      </Card> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
  card: {marginBottom: 16},
  buttonContainer: {marginTop: 16},
  button: {marginBottom: 8},
});

export default HomeScreen;
