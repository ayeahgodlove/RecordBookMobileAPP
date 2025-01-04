import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  mode: 'contained' | 'text' | 'outlined' | 'elevated';
}
const ButtonComponent: React.FC<Props> = ({title, onPress, mode = 'contained'}) => (
  <PaperButton mode={mode} onPress={onPress}>
    {title}
  </PaperButton>
);

export default ButtonComponent;
