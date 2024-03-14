import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, FormControl, Select, MenuItem } from '@mui/material';

const OPDTimingsForm = () => {
    const [selectedSlot, setSelectedSlot] = useState('');
    const [hospital, setHospital] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [doctorDetails, setDoctorDetails] = useState('');

    useEffect(() => {
        if (selectedSlot && hospital && specialization) {
            const details = fetchDoctorDetails();
            setDoctorDetails(details);
        }
    }, [selectedSlot, hospital, specialization]);

    const handleHospitalChange = (event) => {
        setHospital(event.target.value);
        setSelectedSlot('');
        setSpecialization('');
        setDoctorDetails('');
    };

    const handleSelectChange = (event, type) => {
        if (type === 'slot') {
            setSelectedSlot(event.target.value);
        } else if (type === 'specialization') {
            setSpecialization(event.target.value);
        }
    };

    const fetchDoctorDetails = () => {
        // Mock implementation for demo purposes
        switch (hospital) {
            case 'Hospital 1':
                return getDoctorsBySlotAndSpecialization(selectedSlot, specialization, hospital);
            case 'Hospital 2':
                return getDoctorsBySlotAndSpecialization(selectedSlot, specialization, hospital);
            case 'Hospital 3':
                return getDoctorsBySlotAndSpecialization(selectedSlot, specialization, hospital);
            default:
                return '';
        }
    };

    const getDoctorsBySlotAndSpecialization = (selectedSlot, specialization, hospital) => {
        // Mock implementation for demo purposes
        switch (selectedSlot) {
            case 'Morning':
                return hospital === 'Hospital 1'
                    ? specialization === 'Cardiologist'
                        ? getDoctorDetails('Dr. John Doe', 'Cardiologist', '123-456-7890')
                        : specialization === 'Neurologist'
                        ? getDoctorDetails('Dr. Michael Brown', 'Neurologist', '234-567-8901')
                        : getDoctorDetails('Dr. Sarah Wilson', 'Gynecologist', '678-901-2345')
                    : hospital === 'Hospital 2'
                    ? specialization === 'Orthopedic Surgeon'
                        ? getDoctorDetails('Dr. Jane Smith', 'Orthopedic Surgeon', '987-654-3210')
                        : specialization === 'Ophthalmologist'
                        ? getDoctorDetails('Dr. Emily Johnson', 'Ophthalmologist', '345-678-9012')
                        : getDoctorDetails('Dr. Kevin Martinez', 'Urologist', '789-012-3456')
                    : hospital === 'Hospital 3'
                    ? specialization === 'Dermatologist'
                        ? getDoctorDetails('Dr. David Lee', 'Dermatologist', '456-789-0123')
                        : specialization === 'Pediatrician'
                        ? getDoctorDetails('Dr. Lisa Davis', 'Pediatrician', '567-890-1234')
                        : getDoctorDetails('Dr. Amanda Taylor', 'Psychiatrist', '890-123-4567')
                    : '';
            case 'Afternoon':
                return hospital === 'Hospital 1'
                    ? specialization === 'Cardiologist'
                        ? getDoctorDetails('Dr. Aditya Sharma', 'Cardiologist', '709-221-2226')
                        : specialization === 'Neurologist'
                        ? getDoctorDetails('Dr. Nabarun Mukherjee', 'Neurologist', '831-962-6493')
                        : getDoctorDetails('Dr. Abhishek Rauthan', 'Gynecologist', '709-962-6493')
                    : hospital === 'Hospital 2'
                    ? specialization === 'Orthopedic Surgeon'
                        ? getDoctorDetails('Dr. Jane Martinez', 'Orthopedic Surgeon', '789-012-3456')
                        : specialization === 'Ophthalmologist'
                        ? getDoctorDetails('Dr. Emily Sharma', 'Ophthalmologist', '345-678-9012')
                        : getDoctorDetails('Dr. Kevin Martinez', 'Urologist', '987-654-3210')
                    : hospital === 'Hospital 3'
                    ? specialization === 'Dermatologist'
                        ? getDoctorDetails('Dr. David Davis', 'Dermatologist', '456-789-0123')
                        : specialization === 'Pediatrician'
                        ? getDoctorDetails('Dr. Lisa Lee', 'Pediatrician',  '890-123-4567')
                        : getDoctorDetails('Dr. Amanda Taylor', 'Psychiatrist','567-890-1234')
                    : '';
            case 'Evening':
                return hospital === 'Hospital 1'
                    ? specialization === 'Cardiologist'
                        ? getDoctorDetails('Dr. Aditya Sharma', 'Cardiologist', '709-221-2226')
                        : specialization === 'Neurologist'
                        ? getDoctorDetails('Dr. Nabarun Mukherjee', 'Neurologist', '831-962-6493')
                        : getDoctorDetails('Dr. Abhishek Rauthan', 'Gynecologist', '709-962-6493')
                    : hospital === 'Hospital 2'
                    ? specialization === 'Orthopedic Surgeon'
                        ? getDoctorDetails('Dr. Jane Martinez', 'Orthopedic Surgeon', '789-012-3456')
                        : specialization === 'Ophthalmologist'
                        ? getDoctorDetails('Dr. Emily Sharma', 'Ophthalmologist', '345-678-9012')
                        : getDoctorDetails('Dr. Kevin Martinez', 'Urologist', '987-654-3210')
                    : hospital === 'Hospital 3'
                    ? specialization === 'Dermatologist'
                        ? getDoctorDetails('Dr. David Davis', 'Dermatologist', '456-789-0123')
                        : specialization === 'Pediatrician'
                        ? getDoctorDetails('Dr. Lisa Lee', 'Pediatrician',  '890-123-4567')
                        : getDoctorDetails('Dr. Amanda Taylor', 'Psychiatrist','567-890-1234')
                    : '';
            default:
                return '';
        }
    };

    const getDoctorDetails = (name, specialization, contact) => {
        return `Doctor Name: ${name}\nSpecialization: ${specialization}\nContact: ${contact}`;
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom style={{ color: 'rgb(38, 122, 107)' }}
>
                OPD Timings
            </Typography>
            <Grid container spacing={3}>
                {/* Hospital Selector */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Typography variant="body1" style={{ color: 'rgb(38, 122, 107)' }}
>Select Hospital</Typography>
                        <Select value={hospital} onChange={handleHospitalChange} style={{ color: 'rgb(38, 122, 107)', borderRadius:'16px' }}
>
                            <MenuItem value="Hospital 1">Hospital 1</MenuItem>
                            <MenuItem value="Hospital 2">Hospital 2</MenuItem>
                            <MenuItem value="Hospital 3">Hospital 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* Slot Selector */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <Typography variant="body1" style={{ color: 'rgb(38, 122, 107)' }}
>Select Slot</Typography>
                        <Select
                            value={selectedSlot}
                            onChange={(e) => handleSelectChange(e, 'slot')}
                            disabled={!hospital}
                            style={{ color: 'rgb(38, 122, 107)', borderRadius:'16px'}}

                        >
                            <MenuItem value="Morning">Morning</MenuItem>
                            <MenuItem value="Afternoon">Afternoon</MenuItem>
                            <MenuItem value="Evening">Evening</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {/* Specialization Selector */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="body1" style={{ color: 'rgb(38, 122, 107)' }}
>Select Specialization</Typography>
                        <Select
                            value={specialization}
                            onChange={(e) => handleSelectChange(e, 'specialization')}
                            disabled={!selectedSlot}
                            style={{ color: 'rgb(38, 122, 107)' , borderRadius:'16px'}}
                        >
                            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
                            <MenuItem value="Neurologist">Neurologist</MenuItem>
                            <MenuItem value="Gynecologist">Gynecologist</MenuItem>
                            {/* Add more specializations as needed */}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Doctor Details */}
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        {/* <Typography variant="h5" gutterBottom>
                            {hospital} - {selectedSlot} - {specialization}
                        </Typography> */}
                        {/* Display Doctor Details */}
                        {doctorDetails && (
                            <div>
                                <Typography variant="subtitle1">Doctor Details:</Typography>
                                <Typography variant="body2">{doctorDetails}</Typography>
                            </div>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OPDTimingsForm;