// CreateForm3.js
export const API_BASE_URL = 'http://192.168.69.47:4000';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateForm3 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    selectedStateId,
    selectedDistrictId,
    selectedFederationId,
    selectedPanchayatId,
    selectedVillageId,
    selectedAdolescentGroupId,
    groupName,
    contact,
    fullName,
    birthDate,
    marriageYear,
    mothersName,
    mothersMembership,
    fathersName,
    fathersMembership,
    currentlyStudying,
    highestClass,
    currentWork,
    age,
    setSelectedStateId,
    setSelectedDistrictId,
    setSelectedFederationId,
    setSelectedPanchayatId,
    setSelectedVillageId,
    setSelectedAdolescentGroupId
  } = route.params;

  const [hemoglobin, setHemoglobin] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [pubertyYear, setPubertyYear] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiReport, setBmiReport] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const isAllFieldsFilled = () => {
    return (
      selectedStateId &&
      selectedDistrictId &&
      selectedFederationId &&
      selectedPanchayatId &&
      selectedVillageId &&
      selectedAdolescentGroupId &&
      groupName &&
      contact &&
      fullName &&
      birthDate &&
      marriageYear &&
      mothersName &&
      mothersMembership &&
      fathersName &&
      fathersMembership &&
      currentlyStudying &&
      highestClass &&
      currentWork &&
      hemoglobin &&
      height &&
      weight &&
      pubertyYear &&
      bmi &&
      bmiReport &&
      age
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/submitAdolescentgirl`, {
        State_id: selectedStateId,
        District_id: selectedDistrictId,
        Federation_id: selectedFederationId, // Corrected typo
        Panchayat_id: selectedPanchayatId,
        Village_id: selectedVillageId,
        AdolescentGroup_id: selectedAdolescentGroupId,
        GroupName: groupName,
        Contact: contact,
        FullName: fullName,
        BirthDate: birthDate,
        MarriageYear: marriageYear,
        MothersName: mothersName,
        MothersMembership: mothersMembership,
        FathersName: fathersName,
        FathersMembership: fathersMembership,
        CurrentlyStudying: currentlyStudying,
        HighestClass: highestClass,
        CurrentWork: currentWork,
        Hemoglobin: hemoglobin,
        Height: height,
        Weight: weight,
        PubertyYear: pubertyYear,
        bmi: bmi,
        bmi_report: bmiReport,
        age:age
      });

      console.log(response.data);
      setIsFormSubmitted(true);

      Alert.alert('Success', 'Form submitted successfully', [
        { text: 'OK', onPress: () => {
          // Reset state setters to empty values
          setSelectedStateId('');
          setSelectedDistrictId('');
          setSelectedFederationId('');
          setSelectedPanchayatId('');
          setSelectedVillageId('');
          setSelectedAdolescentGroupId('');
          navigation.navigate('CreateForm');
        }}
      ]);
  
    }  catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Failed to submit form. Please try again later.');
    }
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return '';

    const heightInMeters = height / 100;
    const bmiValue = (weight / Math.pow(heightInMeters, 2)).toFixed(2);

    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      bmiCategory = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obesity';
    }

    return { bmi: bmiValue, category: bmiCategory };
  };

  useEffect(() => {
    const { bmi: calculatedBMI, category } = calculateBMI(weight, height);
    setBmi(calculatedBMI);
    setBmiReport(category);
  }, [weight, height]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Hemoglobin:</Text>
        <TextInput
          style={styles.input}
          value={hemoglobin}
          onChangeText={setHemoglobin}
          placeholder="Hemoglobin"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height:</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Height"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Puberty Year:</Text>
        <TextInput
          style={styles.input}
          value={pubertyYear}
          onChangeText={setPubertyYear}
          placeholder="2001"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>BMI:</Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          value={bmi}
          placeholder="BMI"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>BMI Report:</Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          value={bmiReport}
          placeholder="BMI Report"
          editable={false}
        />
     
     </View>

<View style={styles.buttonContainer}>
  <Button title="Back" onPress={handleBack} color="#28a745" />
</View>

<View style={styles.buttonContainer}>
  <Button
    title="Submit"
    onPress={handleSubmit}
    disabled={!isAllFieldsFilled()}
    color={isAllFieldsFilled() ? '#28a745' : '#ccc'}
  />
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures that the container takes up the entire available space
    backgroundColor: '#6495ED', // Set the background color to blue
  },
inputContainer: {
marginBottom: 10,
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
marginVertical: 5,
borderRadius: 5,
backgroundColor: '#fff',
},
readOnlyInput: {
backgroundColor: '#f2f2f2',
},
buttonContainer: {
marginVertical: 10,
},
});

export default CreateForm3;
