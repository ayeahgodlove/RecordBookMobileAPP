import React from 'react';
import {Appbar} from 'react-native-paper';

interface Props {
  title: string;
  onBackPress: () => void;
}

const Header: React.FC<Props> = ({title, onBackPress}) => (
  <Appbar.Header>
    {/* {onBackPress && <Appbar.BackAction onPress={onBackPress}  />} */}
    <Appbar.Content
      title={title}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    />
  </Appbar.Header>
);

export default Header;
