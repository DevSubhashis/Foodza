import React, { useState } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const FilterModal = ({ visible, onClose, onApply }) => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [expiredDate, setExpiredDate] = useState(null);
  const [size, setSize] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [categories, setCategories] = useState({});
  // const [priceRange, setPriceRange] = useState([50, 250]);

  const [openSize, setOpenSize] = useState(false);
  const [sizes, setSizes] = useState([
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ]);

  const handleApply = () => {
    const filters = {
      searchText,
      expiredDate,
      size,
      origin,
      categories: Object.keys(categories).filter(key => categories[key])
    };
    onApply(filters);
    onClose();
  };

  const handleClearAll = () => {
    setSearchText('');
    setStartDate(new Date());
    setExpiredDate(null);
    setSize(null);
    setOrigin(null);
    setCategories({});
    // setPriceRange([50, 250]);
  };

  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Filters</Text>

              <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }} onPress={onClose}>
                <AntDesignIcons name="closecircle" size={20} />
              </TouchableOpacity>

              <TextInput
                style={styles.searchInput}
                placeholder="Search products"
                value={searchText}
                onChangeText={setSearchText}
              />

              <Text style={styles.label}>Expiry Date</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setStartDate(selectedDate || startDate)
                  setExpiredDate(selectedDate);
                }}
              />

              <Text style={styles.label}>Size</Text>
              <DropDownPicker
                open={openSize}
                value={size}
                items={sizes}
                setOpen={setOpenSize}
                setValue={setSize}
                setItems={setSizes}
                style={styles.dropdown}
              />

              <Text style={styles.label}>Origin</Text>
              <RadioButton.Group onValueChange={value => setOrigin(value)} value={origin}>
                <View style={styles.radioGroup}>
                  <RadioButton.Item label="Indian" value="indian" />
                  <RadioButton.Item label="Non-Indian" value="non-indian" />
                </View>
              </RadioButton.Group>

              <Text style={styles.label}>Categories</Text>
              {['Electronics', 'Clothing', 'Books', 'Home'].map((category) => (
                <CheckBox
                  key={category}
                  title={category}
                  checked={categories[category] || false}
                  onPress={() => setCategories({ ...categories, [category]: !categories[category] })}
                />
              ))}

              {/* <Text style={styles.label}>Price Range</Text>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            allowTouchTrack
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
          />
          <Text>{`$${priceRange[0]} - $${priceRange[1]}`}</Text> */}

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
                  <Text style={styles.buttonText}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                  <Text style={styles.buttonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  thumb: {
    backgroundColor: '#f50',
    height: 20,
    width: 20,
  },
  track: {
    height: 4,
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#f50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FilterModal;