import React, { useState } from 'react';
  import { StyleSheet } from 'react-native';
  import { SelectCountry } from 'react-native-element-dropdown';

  const local_data = [
    {
      value: '1',
      lable: 'Nam',
      
      image: {
        uri: 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png',
      },
    },
    {
      value: '2',
      lable: 'Nữ',
      image: {
        uri: 'https://us.123rf.com/450wm/gomolach/gomolach2306/gomolach230600255/208649689-vector-portrait-of-beautiful-young-asian-woman-with-chinese-asian-traditional-conical-straw-hat.jpg?ver=6',
      },
    },
    {
      value: '3',
      lable: 'Linh Hoạt',
      image: {
        uri: 'https://cdn-icons-png.freepik.com/512/7716/7716042.png',
      },
    },
    
  ];

  const Combobox = ({giatri})=> {
    const [country, setCountry] = useState('3');

    return (
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        maxHeight={200}
        value={country}
        data={local_data}
        valueField="value"
        labelField="lable"
        imageField="image"
        placeholder="Lựa chọn Giới tính"
        searchPlaceholder="Search..."
        // onChange={e => {
        //   giatri(e.value)
        // }}
        onChange={e => {
          giatri(e.lable)
        }}
        // onSelect={e => {
        //   giatri(e.value)
        // }}
      />
    );
  };

  export default Combobox;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 5,
      height: 40,
      width: 180,
      backgroundColor: '#C0BDF5',
      borderRadius: 22,
      paddingHorizontal: 8,
    },
    imageStyle: {
      width: 34,
      height: 34,
      borderRadius: 12,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 8,
    },
    iconStyle: {
      width: 30,
      height: 30,
    },
  });