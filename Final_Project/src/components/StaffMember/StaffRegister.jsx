import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EfooterS from '../../Elements/EfooterS';

import '../../assets/StyleSheets/RegisterStaff.css';

export default function StaffRegister() {
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [details, setDetails] = useState(
        {
            userPrivetName: '',
            userSurname: '',
            userId: '',
            userBirthDate: '',
            userPhoneNumber: '',
            userGender: '',
            userEmail: '',
            userpPassword: '',
            userAddress: ''
        }
    );

    useEffect(() => {
        const storedDetails = JSON.parse(sessionStorage.getItem('currentUserS'));

        const urldos = 'http://localhost:5108/GetOneUser'

        fetch(urldos + '/' + storedDetails.ID, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(response => response.json())
            .then(
                (data) => {
                    const userData = Array.isArray(data) ? data[0] : data; // בדיקה אם הנתונים הם מערך או אובייקט
                    setDetails({
                        userPrivetName: userData.userPrivetName || '',
                        userSurname: userData.userSurname || '',
                        userId: userData.userId || '',
                        userBirthDate: userData.userBirthDate || '',
                        userPhoneNumber: userData.userPhoneNumber || '',
                        userGender: userData.userGender || '',
                        userEmail: userData.userEmail || '',
                        userpPassword: userData.userpPassword || '',
                        userAddress: userData.userAddress || ''
                    });
                },
                () => {
                    console.log(error)
                })


    }, []);

    const handlePhoneNumberChange = (event) => {
        setDetails((prevDetails) => ({
            ...prevDetails,
            userPhoneNumber: event.target.value,
        }));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            console.log('Uploaded file:', file);
            setFile(file)
        } else {
            alert('יש להעלות קובץ מסוג JPG או JPEG בלבד.');
        }
    };

    const handleSubmit = () => {

        if (file) {
            const urlphotol = 'http://localhost:5108/UploadUserPhoto';
            const formData = new FormData();
            formData.append("file", file);

            fetch(urlphotol + '/' + details.userId, {
                method: 'PUT',
                body: formData,
            })
                .then(res => {
                    console.log('res=', res);
                    return res.json()
                })
                .then(
                    () => {
                        navigate('/StaffRegister2', { state: details });
                    },
                    (error) => {
                        console.log("err post=", error);
                    });
        }
        else {
            navigate('/StaffRegister2', { state: details });
        }
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
                    value={details.userPrivetName}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    className='register-textfield'
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="שם משפחה"
                    value={details.userSurname}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    className='register-textfield'
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="תעודת זהות"
                    value={details.userId}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    className='register-textfield'
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="תאריך לידה"
                    value={details.userBirthDate}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    className='register-textfield'
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="מספר טלפון"
                    value={details.userPhoneNumber}
                    onChange={handlePhoneNumberChange}
                    variant="outlined"
                    className='register-textfield'
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
