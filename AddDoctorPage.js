import React from 'react';
import { Container, Box, ThemeProvider } from '@mui/material';
import AddDoctorForm from './AddDoctorForm'; // Import your AddDoctorForm component
import SideBar from './SideBar'; // Import your SideBar component
import RightNavbar from './RightNavbar'; // Import your RightNavbar component
import MidNavbar from './MidNavbar'; // Import your MidNavbar component
import NavbarTheme from './NavbarTheme'; // Import your NavbarTheme

const AddDoctorPage = () => {
    return (
        <ThemeProvider theme={NavbarTheme}>
            <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <Box display="flex" >
                    <Box flex={8}>
                        <MidNavbar />
                    </Box>
                    <Box flex={1} display="flex" justifyContent="flex-end" >
                        <RightNavbar />
                    </Box>
            </Box>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center" marginTop={12}>
                    <Container maxWidth="xl">
                        <SideBar />
                        <AddDoctorForm />
                    </Container>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AddDoctorPage;
