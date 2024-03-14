import React from 'react';
import { Container, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';

const AddDoctorForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Add Doctor
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    InputProps={{ style: { borderRadius: 16 } }} 
                                    InputLabelProps={{ style: { color: 'rgb(38, 122, 107)'} }}
                                    required
                        />
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    InputProps={{ style: { borderRadius: 16 } }} 
                                    InputLabelProps={{ style: { color: 'rgb(38, 122, 107)' } }}
                                    required
                                />
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    InputProps={{ style: { borderRadius: 16 } }} 
                                    InputLabelProps={{ style: { color: 'rgb(38, 122, 107)' } }}
                                    required
                                />
                            
                        </Grid>
                        <Grid item xs={12}>
    <FormControl variant="outlined" fullWidth>
        <InputLabel style={{ color: 'rgb(38, 122, 107)' }}>Select Specialization</InputLabel>
        <Select
            label="Select Specialization"
            defaultValue=""
            inputProps={{ style: { borderRadius: 16 } }}
            MenuProps={{ PaperProps: { style: { borderRadius: 16 } } }}
        >
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Neurologist">Neurologist</MenuItem>
            {/* Add more specialties as needed */}
        </Select>
    </FormControl>
</Grid>
                        <Grid item xs={12}>
                            
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Qualification"
                                    name="qualification"
                                    InputProps={{ style: { borderRadius: 16 } }} 
                                    InputLabelProps={{ style: { color: 'rgb(38, 122, 107)' } }}
                                    required
                                />
                            
                        </Grid>
                        <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Registration ID"
                                    name="registrationId"
                                    InputProps={{ style: { borderRadius: 16} }}
                                    InputLabelProps={{ style: { color: 'rgb(38, 122, 107)' } }}
                                    required
                                />
                            
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth
                            sx={{
                                    marginTop:'8px',
                                    borderRadius: 16,
                                    backgroundColor: 'rgb(38, 122, 107)',
                                    fontSize: '24px',
                                }}
                        >
                            Add Doctor
                        </Button>
                    </Grid>
                </form>
            {/* </Box> */}
        </Container>
    );
};

export default AddDoctorForm;