import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateForm1.css';
function CreateForm1() {
    const location = useLocation();
    const {
        selectedStateId,
        selectedDistrictId,
        selectedFederationId,
        selectedPanchayatId,
        selectedVillageId,
        selectedAdolescentGroupId
    } = location.state;
    const navigate = useNavigate(); // Get the navigate function

    const [groupName, setGroupName] = useState('');
    const [contact, setContact] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [marriageYear, setMarriageYear] = useState('');
    const [mothersName, setMothersName] = useState('');
    const [mothersMembership, setMothersMembership] = useState('');
    const [fathersName, setFathersName] = useState('');
    const [fathersMembership, setFathersMembership] = useState('');
    const [currentlyStudying, setCurrentlyStudying] = useState('');
    const [highestClass, setHighestClass] = useState('');
    const [currentWork, setCurrentWork] = useState('');

    // Function to check if all fields are filled
    const isAllFieldsFilled = () => {
        return (
            groupName.trim() !== '' &&
            contact.trim() !== '' &&
            fullName.trim() !== '' &&
            birthDate.trim() !== '' &&
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

    const inputStyle = {
        width: '100%', // Set a common width for all input fields and select fields
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '500px',
        margin: 'auto'
    };

    const labelStyle = {
        width: '100%',
        marginBottom: '5px'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        border: 'none',
        backgroundColor: isAllFieldsFilled() ? '#28a745' : '#ccc', // Green if all fields are filled, gray otherwise
        color: '#fff',
        cursor: 'pointer'
    };

    const handleNext = () => {
        navigate('/createform3', {
            state: {
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
            }
        });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
             <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#6495ED',
      height: '160vh', // Set height to 100% of viewport height
    }}>
            <div>
                <label htmlFor="groupName"className="labelText" style={labelStyle}>Group Name:</label>
                <input type="text" id="groupName" placeholder="GroupName"value={groupName} onChange={(e) => setGroupName(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="contact" style={labelStyle} className="labelText">Contact:</label>
                <input type="text" id="contact" value={contact}placeholder="1234567890" onChange={(e) => setContact(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="fullName" style={labelStyle}className="labelText">Full Name:</label>
                <input type="text" id="fullName" value={fullName} placeholder="FullName" onChange={(e) => setFullName(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="birthDate" style={labelStyle}className="labelText">Birth Date:</label>
                <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="marriageYear" style={labelStyle}className="labelText">Marriage Year</label>
                <select id="marriageYear" value={marriageYear} onChange={(e) => setMarriageYear(e.target.value)} style={inputStyle}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div>
                <label htmlFor="mothersName" style={labelStyle}className="labelText">Mother's Name:</label>
                <input type="text" id="mothersName" value={mothersName} placeholder="MothersName" onChange={(e) => setMothersName(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="mothersMembership" style={labelStyle}className="labelText">Mother's Membership:</label>
                <input type="text" id="mothersMembership" placeholder="MothersMembership"value={mothersMembership} onChange={(e) => setMothersMembership(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="fathersName" style={labelStyle}className="labelText">Father's Name:</label>
                <input type="text" id="fathersName"placeholder="FathersName" value={fathersName} onChange={(e) => setFathersName(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="fathersMembership" style={labelStyle}className="labelText">Father's Membership:</label>
                <input type="text" id="fathersMembership"placeholder="FathersMembership" value={fathersMembership} onChange={(e) => setFathersMembership(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="currentlyStudying" style={labelStyle}className="labelText">Currently Studying:</label>
                <select id="currentlyStudying" value={currentlyStudying} onChange={(e) => setCurrentlyStudying(e.target.value)} style={inputStyle}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div>
                <label htmlFor="highestClass" style={labelStyle}className="labelText">Highest Class:</label>
                <input type="text" id="highestClass"placeholder="HighestClass" value={highestClass} onChange={(e) => setHighestClass(e.target.value)} style={inputStyle} />
            </div>

            <div>
                <label htmlFor="currentWork" style={labelStyle}className="labelText">Current Work:</label>
                <input type="text" id="currentWork"placeholder="CurrentWork" value={currentWork} onChange={(e) => setCurrentWork(e.target.value)} style={inputStyle} />
            </div>

            <button onClick={handleBack} style={{ ...buttonStyle, backgroundColor: '#28a745' }}>Back</button>

            {/* Next button */}
            <button onClick={handleNext} style={buttonStyle} disabled={!isAllFieldsFilled()}>Next</button>
        </div>
    );
}

export default CreateForm1;

