import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function ManagerRegister() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        file: ''
    });

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const validateForm = () => {
        const newErrors = {};
        const hebrewRegex = /^[\u0590-\u05FF\s]+$/;

        if (!formValues.firstName) {
            newErrors.firstName = 'יש למלא את שם פרטי';
        } else if (!hebrewRegex.test(formValues.firstName)) {
            newErrors.firstName = 'יש למלא בשפה העברית בלבד';
        }

        if (!formValues.lastName) {
            newErrors.lastName = 'יש למלא את שם משפחה';
        } else if (!hebrewRegex.test(formValues.lastName)) {
            newErrors.lastName = 'יש למלא בשפה העברית בלבד';
        }

        if (!formValues.birthDate) {
            newErrors.birthDate = 'יש למלא את תאריך הלידה';
        } else if (calculateAge(formValues.birthDate) < 18) {
            newErrors.birthDate = 'יש להיות מעל גיל 18';
        }

        if (!formValues.gender) {
            newErrors.gender = 'יש לבחור את המין';
        }

        if (!formValues.file) {
            newErrors.file = 'יש להעלות תמונת פרופיל';
        } else {
            const fileType = formValues.file.type;
            if (fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
                newErrors.file = 'יש להעלות קובץ מסוג JPG או JPEG בלבד';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormValues((prevData) => ({
            ...prevData,
            [name]: name === 'file' ? files[0] : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Save data to localStorage
            localStorage.setItem('registrationData', JSON.stringify(formValues));
            navigate('/ManagerRegister2');
        } else {
            console.log('Form has validation errors. Cannot submit.');
        }
    };


    return (
        <form>
            <h2 className='registerh2'>הרשמה</h2>
            <div className='registerdiv'>
                <h2 style={{ textAlign: 'center', margin: 0 }}>פרטים אישיים</h2>
            </div>
            <FormControl fullWidth margin="normal" style={{ width: '120%' }}>
                <TextField
                    label="שם פרטי"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    className='register-textfield'
                    variant="outlined"
                />
                <br />
                <TextField
                    label="שם משפחה"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    className='register-textfield'
                    variant="outlined"
                />
                <br />
                <TextField
                    name="birthDate"
                    type="date"
                    value={formValues.birthDate}
                    onChange={handleChange}
                    error={!!errors.birthDate}
                    helperText={errors.birthDate}
                    InputLabelProps={{ shrink: true }}
                    className='register-textfield'
                    variant="outlined"
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={0}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        margin: '20px',
                        backgroundColor: '#076871',
                        '&:hover': {
                            backgroundColor: '#6196A6',
                        }
                    }}        >
                    העלאת תמונת פרופיל
                    <input
                        type="file"
                        name="file"
                        style={{ display: 'none' }}
                        accept="image/png, image/jpeg"
                        onChange={handleChange}
                    />
                </Button>
                {errors.profilePicture && <p>{errors.profilePicture}</p>}
            </FormControl>
            <FormControl fullWidth margin="normal" style={{ width: '120%' }}>
                <InputLabel id="gender-label">מין</InputLabel>
                <Select
                    labelId="gender-label"
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    className='register-textfield'
                >
                    <MenuItem value=""><em>בחר</em></MenuItem>
                    <MenuItem value="male">זכר</MenuItem>
                    <MenuItem value="female">נקבה</MenuItem>
                    <MenuItem value="other">אחר</MenuItem>
                </Select>
                {errors.gender && <p>{errors.gender}</p>}
            </FormControl>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
                המשך
            </Button>
        </form>
    );
};

