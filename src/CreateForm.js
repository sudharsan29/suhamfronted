import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateForm.css';

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
  const navigate = useNavigate(); // Get the navigate function

  const handleNext = () => {
    // Pass selected data to CreateForm1 component via props
    navigate('/createform1', {
      state: {
        selectedStateId,
        selectedDistrictId,
        selectedFederationId,
        selectedPanchayatId,
        selectedVillageId,
        selectedAdolescentGroupId
      }
    });
  };

  // Fetch states data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/states');
        setMapData(response.data);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch districts data when selectedStateId changes
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/districts/${selectedStateId}`);
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
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
        const response = await axios.get(`http://localhost:3000/federations/${selectedStateId}/${selectedDistrictId}`);
        setFederations(response.data);
      } catch (error) {
        console.error('Error fetching federations:', error);
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
        const response = await axios.get(`http://localhost:3000/panchayats/${selectedStateId}/${selectedDistrictId}/${selectedFederationId}`);
        setPanchayats(response.data);
      } catch (error) {
        console.error('Error fetching panchayats:', error);
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
        const response = await axios.get(`http://localhost:3000/villages/${selectedStateId}/${selectedDistrictId}/${selectedFederationId}/${selectedPanchayatId}`);
        setVillages(response.data);
      } catch (error) {
        console.error('Error fetching villages:', error);
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
        const response = await axios.get('http://localhost:3000/adolescentgroups');
        setAdolescentGroups(response.data);
      } catch (error) {
        console.error('Error fetching Adolescent Groups:', error);
      }
    };

    fetchAdolescentGroups();
  }, []);

  const handleStateChange = (e) => {
    setSelectedStateId(e.target.value);
    setSelectedDistrictId('');
    setSelectedFederationId('');
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected state ID:', e.target.value);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrictId(e.target.value);
    setSelectedFederationId('');
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected district ID:', e.target.value);
  };

  const handleFederationChange = (e) => {
    setSelectedFederationId(e.target.value);
    setSelectedPanchayatId('');
    setSelectedVillageId('');
    console.log('Selected federation ID:', e.target.value);
  };

  const handlePanchayatChange = (e) => {
    setSelectedPanchayatId(e.target.value);
    setSelectedVillageId('');
    console.log('Selected panchayat ID:', e.target.value);
  };

  const handleVillageChange = (e) => {
    setSelectedVillageId(e.target.value);
    console.log('Selected Village ID:', e.target.value);
  };

  const handleAdolescentGroupChange = (e) => {
    const selectedGroupId = e.target.value;
    setSelectedAdolescentGroupId(selectedGroupId);
    console.log('Selected Adolescent Group ID:', selectedGroupId);
  };

  // Check if all required fields are selected
  const isNextButtonEnabled = selectedStateId && selectedDistrictId && selectedFederationId && selectedPanchayatId && selectedVillageId && selectedAdolescentGroupId;

  const inputStyle = {
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer'
  };

  // const containerStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   padding: '20px',
  //   backgroundColor: '#f0f8ff',
  // };
  if (isNextButtonEnabled) {
    buttonStyle.backgroundColor = '#28a745'; // green color
  } else {
    buttonStyle.backgroundColor = '#ccc'; // light gray color
    buttonStyle.pointerEvents = 'none';
    buttonStyle.opacity = '0.5'; // Reduce opacity for disabled button
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#6495ED',
      height: '100vh', // Set height to 100% of viewport height
    }}>
    
    <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' ,}}>Register Form</h1>
      <div style={{ width: '100%', maxWidth: '400px' }}>
      <label className="labelText" htmlFor="stateSelect">Select a State:</label>
        <select id="stateSelect" value={selectedStateId} onChange={handleStateChange} style={inputStyle}>
          <option value="">Select a State</option>
          {mapData.map(state => (
            <option key={state.id} value={state.State_id}>
              {state.State_name}
            </option>
          ))}
        </select>
      </div>
      {selectedStateId && (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label htmlFor="districtSelect"className="labelText">Select a District:</label>
          <select id="districtSelect" value={selectedDistrictId} onChange={handleDistrictChange} style={inputStyle}>
            <option value="">Select a District</option>
            {districts.map(district => (
              <option key={district.District_id} value={district.District_id}>
                {district.District_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedDistrictId && (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label htmlFor="federationSelect"className="labelText">Select a Federation:</label>
          <select id="federationSelect" value={selectedFederationId} onChange={handleFederationChange} style={inputStyle}>
            <option value="">Select a Federation</option>
            {federations.map(federation => (
              <option key={federation.Fedration_id} value={federation.Fedration_id}>
                {federation.Fedration_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedFederationId && (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label htmlFor="panchayatSelect"className="labelText">Select a Panchayat:</label>
          <select id="panchayatSelect" value={selectedPanchayatId} onChange={handlePanchayatChange} style={inputStyle}>
            <option value="">Select a Panchayat</option>
            {panchayats.map(panchayat => (
              <option key={panchayat.Panchayat_id} value={panchayat.Panchayat_id}>
                {panchayat.Panchayat_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedPanchayatId && (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label htmlFor="villageSelect"className="labelText">Select a Village:</label>
          <select id="villageSelect" value={selectedVillageId} onChange={handleVillageChange} style={inputStyle}>
            <option value="">Select a Village</option>
            {villages.map(village => (
              <option key={village.Village_id} value={village.Village_id}>
                {village.Village_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedVillageId && (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <label htmlFor="adolescentGroupSelect"className="labelText">Select an Adolescent Group:</label>
          <select id="adolescentGroupSelect" value={selectedAdolescentGroupId} onChange={handleAdolescentGroupChange} style={inputStyle}>
            <option value="">Select an Adolescent Group</option>
            {adolescentGroups.map(group => (
              <option key={group.AdolescentGroup_id} value={group.AdolescentGroup_id}>
                {group.AdolescentGroup}
              </option>
            ))}
          </select>
        </div>
      )}

      <button onClick={handleNext} disabled={!isNextButtonEnabled} style={buttonStyle}>Next</button>
    </div>
  );
};

export default MapComponent;

