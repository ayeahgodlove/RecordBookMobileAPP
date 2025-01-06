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
                textAlign: 'center',
              }}>
              Welcome back {user?.fullname}!
            </Text>
          }
        />
      </Card>

      {/* Financial Summary */}
      <Card style={styles.card}>
        <Card.Title
          title={
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
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
                {format.number(financialStats.totalExpense) + ' XAF'}
              </DataTable.Cell>
              <DataTable.Cell>
                {format.number(financialStats.totalIncome) + ' XAF'}
              </DataTable.Cell>
              <DataTable.Cell>
                {format.number(financialStats.totalAmount) + ' XAF'}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      {/* Assets Overview */}
      <Card style={styles.card}>
        <Card.Title
          title={
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
              }}>
              Assets Overview
            </Text>
          }
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text variant="titleSmall">Registered Assets</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text variant="titleSmall">Estimated Value</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>{format.number(assetStats.count)}</DataTable.Cell>
              <DataTable.Cell>
                {format.number(assetStats.estimatedValue) + ' XAF'}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      {/* Meeting Highlights */}
      <Card style={styles.card}>
        <Card.Title
          title={
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
              }}>
              Meeting Highlights
            </Text>
          }
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>
                <Text variant="titleSmall">Last Meeting</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text variant="titleSmall">Total Meetings This Month</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>
                {meetingStats.lastMeetingTitle} - {meetingStats.lastMeetingDate}
              </DataTable.Cell>
              <DataTable.Cell>
                {format.number(meetingStats.totalMeetings)}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: '100%',
  },
  card: {marginBottom: 20},
  buttonContainer: {marginTop: 16},
  button: {marginBottom: 8},
});

export default HomeScreen;
