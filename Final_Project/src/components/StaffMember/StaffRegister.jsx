import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EfooterS from '../../Elements/EfooterS';

import '../../assets/StyleSheets/RegisterStaff.css';

export default function StaffRegister() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        idNumber: '',
        birthDate: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const storedDetails = JSON.parse(sessionStorage.getItem('currentUser'));
        if (storedDetails) {
            setDetails({
                firstName: storedDetails.firstName || '',
                lastName: storedDetails.lastName || '',
                idNumber: storedDetails.idNumber || '',
                birthDate: storedDetails.birthDate || '',
                phoneNumber: storedDetails.phoneNumber || '',
            });
        }
    }, []);

    const handlePhoneNumberChange = (event) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            phoneNumber: event.target.value,
        }));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            console.log('Uploaded file:', file);
            // כאן ניתן להוסיף לוגיקה לטיפול בהעלאת התמונה
        } else {
            alert('יש להעלות קובץ מסוג JPG או JPEG בלבד.');
        }
    };

    const handleSubmit = () => {
        navigate('/StaffRegister2', { state: details });
    };

    return (
        <>
            <form>
                <div style={{ backgroundColor: '#cce7e8', padding: 10, borderRadius: 5, marginBottom: 30 }}>
                    <h2 style={{ textAlign: 'center', margin: 0 }}> פרטים אישיים {details.firstName} </h2>
                </div>
                <TextField
                    fullWidth
                    margin="normal"
                    label="שם פרטי"
                    value={details.firstName}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="שם משפחה"
                    value={details.lastName}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    color="primary"
                    sx={{ mt: 2, mb: 2 }}
                >
                    העלאת תמונה
                    <input
                        type="file"
                        accept="image/jpeg,image/jpg"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>
                <TextField
                    fullWidth
                    margin="normal"
                    label="תעודת זהות"
                    value={details.idNumber}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="תאריך לידה"
                    value={details.birthDate}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="מספר טלפון"
                    value={details.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    variant="outlined"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    המשך
                </Button>
            </form>
            {EfooterS}
        </>
    );
}
