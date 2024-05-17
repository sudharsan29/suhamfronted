import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateForm3.css';

function CreateForm3() {
    const location = useLocation();
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
        currentWork
    } = location.state;

    const [hemoglobin, setHemoglobin] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [pubertyYear, setPubertyYear] = useState('');
    const [bmi, setBmi] = useState('');
    const [bmiReport, setBmiReport] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const navigate = useNavigate();

    // Function to check if all required fields are filled
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
            bmiReport
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/submitAdolescentgirl', {
                State_id: selectedStateId,
                District_id: selectedDistrictId,
                Fedration_id: selectedFederationId,
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
                bmi_report: bmiReport
            });
            console.log(response.data);
            setIsFormSubmitted(true);
            resetForm();
            navigate('/');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const resetForm = () => {
        setHemoglobin('');
        setHeight('');
        setWeight('');
        setPubertyYear('');
        setBmi('');
        setBmiReport('');
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

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        border: 'none',
        backgroundColor: isAllFieldsFilled() ? '#28a745' : '#ccc',
        color: '#fff',
        cursor: 'pointer'
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '500px',
            margin: 'auto',
            backgroundColor: '#6495ED',
            height: '100vh'
        }}>
            <div>
                <label htmlFor="hemoglobin" className="labelText">Hemoglobin:</label>
                <input type="number" id="hemoglobin" placeholder='Hemoglobin' value={hemoglobin} onChange={(e) => setHemoglobin(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="height" className="labelText">Height:</label>
                <input type="number" id="height" value={height} placeholder='Height' onChange={(e) => setHeight(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="weight" className="labelText">Weight:</label>
                <input type="number" id="weight" value={weight} placeholder='Weight' onChange={(e) => setWeight(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="pubertyYear" className="labelText">Puberty Year:</label>
                <input type="number" id="pubertyYear" value={pubertyYear} placeholder='2001' onChange={(e) => setPubertyYear(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="bmi" className="labelText">BMI:</label>
                <input type="number" id="bmi" value={bmi} placeholder='Bmi' readOnly style={{ ...inputStyle, backgroundColor: '#f2f2f2' }} />
            </div>

            <div>
                <label htmlFor="bmiReport" className="labelText">BMI Report:</label>
                <input type="text" id="bmiReport" value={bmiReport} placeholder='BmiReport' readOnly style={{ ...inputStyle, backgroundColor: '#f2f2f2' }} />
            </div>

            <button onClick={() => navigate('/')} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Back</button>
            <button onClick={handleSubmit} disabled={!isAllFieldsFilled()} style={{ ...buttonStyle, backgroundColor: isAllFieldsFilled() ? '#28a745' : '#ccc' }}>Submit</button>
        </div>
    );
}

export default CreateForm3;
