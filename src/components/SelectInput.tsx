import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Menu, TextInput, Button, Divider} from 'react-native-paper';

interface SelectInputProps {
  label: string;
  options: {label: string; value: string}[];
  value: string;
  onValueChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onValueChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [inputWidth, setInputWidth] = useState<number>(0);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    closeMenu();
  };

  const handleInputLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setInputWidth(width);
  };
  
  const selectedOption = options.find(option => option.value === value);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label={label}
            value={selectedOption?.label || ''}
            onFocus={openMenu}
            showSoftInputOnFocus={false} // Prevents keyboard from appearing
            style={styles.input}
            onLayout={handleInputLayout}
          />
        }
        style={[styles.menu, {width: inputWidth}]}
        >
        {options.map(option => (
          <React.Fragment key={option.value}>
            <Menu.Item
              onPress={() => handleSelect(option.value)}
              title={option.label}
            />
            <Divider />
          </React.Fragment>
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  menu: {
    marginTop: 8, // Adjust if needed to align menu with input
  },
});

export default SelectInput;
