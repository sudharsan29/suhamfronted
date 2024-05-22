import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const CreateForm1 = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    selectedStateId,
    selectedDistrictId,
    selectedFederationId,
    selectedPanchayatId,
    selectedVillageId,
    selectedAdolescentGroupId,
    setSelectedStateId, // pass setSelectedStateId as a prop
      setSelectedDistrictId, // pass setSelectedDistrictId as a prop
      setSelectedFederationId, // pass setSelectedFederationId as a prop
      setSelectedPanchayatId, // pass setSelectedPanchayatId as a prop
      setSelectedVillageId, // pass setSelectedVillageId as a prop
      setSelectedAdolescentGroupId // pass setSelectedAdolescentGroupId as a prop
  } = route.params;

  const [groupName, setGroupName] = useState('');
  const [contact, setContact] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [marriageYear, setMarriageYear] = useState('');
  const [mothersName, setMothersName] = useState('');
  const [mothersMembership, setMothersMembership] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [fathersMembership, setFathersMembership] = useState('');
  const [currentlyStudying, setCurrentlyStudying] = useState('');
  const [highestClass, setHighestClass] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // State to track whether the date picker should be shown or not
  const [age, setAge] = useState(''); // State for age

  const isAllFieldsFilled = () => {
    return (
      groupName.trim() !== '' &&
      contact.trim() !== '' &&
      fullName.trim() !== '' &&
      birthDate &&
      marriageYear.trim() !== '' &&
      mothersName.trim() !== '' &&
      mothersMembership.trim() !== '' &&
      fathersName.trim() !== '' &&
      fathersMembership.trim() !== '' &&
      currentlyStudying.trim() !== '' &&
      highestClass.trim() !== '' &&
      currentWork.trim() !== ''
    );
  };

  const handleNext = () => {
    const formattedBirthDate = moment(birthDate).format('YYYY-MM-DD');
    navigation.navigate('CreateForm3', {
      selectedStateId,
      selectedDistrictId,
      selectedFederationId,
      selectedPanchayatId,
      selectedVillageId,
      selectedAdolescentGroupId,
      setSelectedStateId,
      setSelectedDistrictId,
      setSelectedFederationId,
      setSelectedPanchayatId,
      setSelectedVillageId,
      setSelectedAdolescentGroupId,
      groupName,
      contact,
      fullName,
      birthDate: formattedBirthDate,
      marriageYear,
      mothersName,
      mothersMembership,
      fathersName,
      fathersMembership,
      currentlyStudying,
      highestClass,
      currentWork,
      age // Passing age to the next screen
    });
  };
  

  const handleBack = () => {
    navigation.goBack();
  };

  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (birthDate) {
      setAge(calculateAge(birthDate).toString());
    }
  }, [birthDate]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Group Name:</Text>
        <TextInput
          style={styles.input}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Group Name"
        />

        <Text style={styles.label}>Contact:</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          placeholder="1234567890"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />

        <Text style={styles.label}>Birth Date:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.input}>
            <Text>{birthDate.toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false); // Close date picker when a date is selected
              const currentDate = selectedDate || birthDate;
              setBirthDate(currentDate);
            }}
          />
        )}

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          editable={false}
          placeholder="Age"
        />

        <Text style={styles.label}>Marriage Year:</Text>
        <Picker
          selectedValue={marriageYear}
          style={styles.input}
          onValueChange={setMarriageYear}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>

        <Text style={styles.label}>Mother's Name:</Text>
        <TextInput
          style={styles.input}
          value={mothersName}
          onChangeText={setMothersName}
          placeholder="Mother's Name"
        />

        <Text style={styles.label}>Mother's Membership:</Text>
        <TextInput
          style={styles.input}
          value={mothersMembership}
          onChangeText={setMothersMembership}
          placeholder="Mother's Membership"
        />

        <Text style={styles.label}>Father's Name:</Text>
        <TextInput
          style={styles.input}
          value={fathersName}
          onChangeText={setFathersName}
          placeholder="Father's Name"
        />

        <Text style={styles.label}>Father's Membership:</Text>
        <TextInput
          style={styles.input}
          value={fathersMembership}
          onChangeText={setFathersMembership}
          placeholder="Father's Membership"
        />

        <Text style={styles.label}>Currently Studying:</Text>
        <Picker
          selectedValue={currentlyStudying}
          style={styles.input}
          onValueChange={setCurrentlyStudying}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
        </Picker>

        <Text style={styles.label}>Highest Class:</Text>
        <TextInput
          style={styles.input}
          value={highestClass}
          onChangeText={setHighestClass}
          placeholder="Highest Class"
        />

        <Text style={styles.label}>Current Work:</Text>
        <TextInput
          style={styles.input}
          value={currentWork}
          onChangeText={setCurrentWork}
          placeholder="Current Work"
        />

        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handleBack} color="#28a745" />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} disabled={!isAllFieldsFilled()} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#6495ED',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default CreateForm1;
