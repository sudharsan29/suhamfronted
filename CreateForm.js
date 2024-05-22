// MapComponent.js
export const API_BASE_URL = 'http://192.168.69.47:4000';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const MapComponent = () => {
  const [mapData, setMapData] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [federations, setFederations] = useState([]);
  const [selectedFederationId, setSelectedFederationId] = useState('');
  const [panchayats, setPanchayats] = useState([]);
  const [selectedPanchayatId, setSelectedPanchayatId] = useState('');
  const [villages, setVillages] = useState([]);
  const [selectedVillageId, setSelectedVillageId] = useState('');
  const [adolescentGroups, setAdolescentGroups] = useState([]);
  const [selectedAdolescentGroupId, setSelectedAdolescentGroupId] = useState('');
  const navigation = useNavigation(); // Get the navigation function

  const handleNext = () => {
    // Pass selected data to CreateForm1 component via props
    navigation.navigate('CreateForm1', {
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
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/states`); // Use the common IP address
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching map data:', error.message, error.response);
      }
    };

    fetchData();
  }, []);

  // Fetch districts data when selectedStateId changes
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/districts/${selectedStateId}`); // Use the common IP address
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error.message, error.response);
      }
    };

    if (selectedStateId) {
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedStateId]);

  // Fetch federations data when selectedDistrictId changes
  useEffect(() => {
    const fetchFederations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/federations/${selectedStateId}/${selectedDistrictId}`); // Use the common IP address
        setFederations(response.data);
      } catch (error) {
        console.error('Error fetching federations:', error.message, error.response);
      }
    };

    if (selectedDistrictId) {
      fetchFederations();
    } else {
      setFederations([]);
    }
  }, [selectedDistrictId]);

  // Fetch panchayats data when selectedFederationId changes
  useEffect(() => {
    const fetchPanchayats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/panchayats/${selectedStateId}/${selectedDistrictId}/${selectedFederationId}`); // Use the common IP address
        setPanchayats(response.data);
      } catch (error) {
        console.error('Error fetching panchayats:', error.message, error.response);
      }
    };

    if (selectedFederationId) {
      fetchPanchayats();
    } else {
      setPanchayats([]);
    }
  }, [selectedFederationId]);

  // Fetch villages data when selectedPanchayatId changes
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/villages/${selectedStateId}/${selectedDistrictId}/${selectedFederationId}/${selectedPanchayatId}`); // Use the common IP address
        setVillages(response.data);
      } catch (error) {
        console.error('Error fetching villages:', error.message, error.response);
      }
    };

    if (selectedPanchayatId) {
      fetchVillages();
    } else {
      setVillages([]);
    }
  }, [selectedPanchayatId]);

  // Fetch Adolescent Groups data
  useEffect(() => {
    const fetchAdolescentGroups = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/adolescentgroups`); // Use the common IP address
        setAdolescentGroups(response.data);
      } catch (error) {
        console.error('Error fetching Adolescent Groups:', error.message, error.response);
      }
    };

    fetchAdolescentGroups();
  }, []);


  const handleStateChange = (itemValue) => {
    setSelectedStateId(itemValue);
    setSelectedDistrictId('');
    setSelectedFederationId('');
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected state ID:', itemValue);
  };

  const handleDistrictChange = (itemValue) => {
    setSelectedDistrictId(itemValue);
    setSelectedFederationId('');
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected district ID:', itemValue);
  };

  const handleFederationChange = (itemValue) => {
    setSelectedFederationId(itemValue);
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected federation ID:', itemValue);
  };

  const handlePanchayatChange = (itemValue) => {
    setSelectedPanchayatId(itemValue);
    setSelectedVillageId('');
    console.log('Selected panchayat ID:', itemValue);
  };

  const handleVillageChange = (itemValue) => {
    setSelectedVillageId(itemValue);
    console.log('Selected Village ID:', itemValue);
  };

  const handleAdolescentGroupChange = (itemValue) => {
    setSelectedAdolescentGroupId(itemValue);
    console.log('Selected Adolescent Group ID:', itemValue);
  };

  // Check if all required fields are selected
  const isNextButtonEnabled = selectedStateId && selectedDistrictId && selectedFederationId && selectedPanchayatId && selectedVillageId && selectedAdolescentGroupId;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register Form</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select a State:</Text>
        <Picker selectedValue={selectedStateId} onValueChange={handleStateChange} style={styles.picker}>
          <Picker.Item label="Select a State" value="" />
          {mapData.map(state => (
            <Picker.Item key={state.id} label={state.State_name} value={state.State_id} />
          ))}
        </Picker>
      </View>
      {selectedStateId && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select a District:</Text>
          <Picker selectedValue={selectedDistrictId} onValueChange={handleDistrictChange} style={styles.picker}>
            <Picker.Item label="Select a District" value="" />
            {districts.map(district => (
              <Picker.Item key={district.District_id} label={district.District_name} value={district.District_id} />
            ))}
          </Picker>
        </View>
      )}
      {selectedDistrictId && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select a Federation:</Text>
          <Picker selectedValue={selectedFederationId} onValueChange={handleFederationChange} style={styles.picker}>
            <Picker.Item label="Select a Federation" value="" />
            {federations.map(federation => (
              <Picker.Item key={federation.Fedration_id} label={federation.Fedration_name} value={federation.Fedration_id} />
            ))}
          </Picker>
        </View>
    
            )}
            {selectedFederationId && (
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Select a Panchayat:</Text>
                <Picker selectedValue={selectedPanchayatId} onValueChange={handlePanchayatChange} style={styles.picker}>
                  <Picker.Item label="Select a Panchayat" value="" />
                  {panchayats.map(panchayat => (
                    <Picker.Item key={panchayat.Panchayat_id} label={panchayat.Panchayat_name} value={panchayat.Panchayat_id} />
                  ))}
                </Picker>
              </View>
            )}
            {selectedPanchayatId && (
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Select a Village:</Text>
                <Picker selectedValue={selectedVillageId} onValueChange={handleVillageChange} style={styles.picker}>
                  <Picker.Item label="Select a Village" value="" />
                  {villages.map(village => (
                    <Picker.Item key={village.Village_id} label={village.Village_name} value={village.Village_id} />
                  ))}
                </Picker>
              </View>
            )}
            {selectedVillageId && (
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Select an Adolescent Group:</Text>
                <Picker selectedValue={selectedAdolescentGroupId} onValueChange={handleAdolescentGroupChange} style={styles.picker}>
                  <Picker.Item label="Select an Adolescent Group" value="" />
                  {adolescentGroups.map(group => (
                    <Picker.Item key={group.AdolescentGroup_id} label={group.AdolescentGroup} value={group.AdolescentGroup_id} />
                  ))}
                </Picker>
              </View>
            )}
            <Button title="Next" onPress={handleNext} disabled={!isNextButtonEnabled} color={isNextButtonEnabled ? '#28a745' : '#ccc'} />
          </ScrollView>
        );
      };
      
      const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          padding: 20,
          backgroundColor: '#6495ED',
          alignItems: 'center',
        },
        title: {
          fontSize: 24,
          marginBottom: 20,
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        },
        pickerContainer: {
          width: '100%',
          maxWidth: 400,
          marginBottom: 20,
        },
        label: {
          fontSize: 16,
          color: '#fff',
          marginBottom: 10,
        },
        picker: {
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 8,
        },
      });
      
      export default MapComponent;
      
