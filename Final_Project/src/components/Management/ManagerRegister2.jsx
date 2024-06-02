import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function AdditionalRegistrationForm(props) {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
        file: null,
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('registrationData'));
        if (savedData) {
            setFormValues((prevData) => ({
                ...prevData,
                ...savedData,
            }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        const phoneRegex = /^\d{10}$/; // Example: assuming phone number should be 10 digits
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formValues.phoneNumber) {
            newErrors.phoneNumber = 'יש למלא את מספר הטלפון';
        } else if (!phoneRegex.test(formValues.phoneNumber)) {
            newErrors.phoneNumber = 'מספר טלפון לא תקין';
        }

        if (!formValues.address) {
            newErrors.address = 'יש למלא את הכתובת';
        }

        if (!formValues.email) {
            newErrors.email = 'יש למלא את האימייל';
        } else if (!emailRegex.test(formValues.email)) {
            newErrors.email = 'אימייל לא תקין';
        }

        if (!formValues.password) {
            newErrors.password = 'יש למלא את הסיסמא';
        }

        if (!formValues.file) {
            newErrors.file = 'יש להעלות מסמך';
        } else {
            const fileType = formValues.file.type;
            if (fileType !== 'application/pdf') { // Example: assuming the file should be PDF
                newErrors.file = 'יש להעלות קובץ מסוג PDF בלבד';
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
            // Merge the new data with the data from localStorage
            const initialData = JSON.parse(localStorage.getItem('registrationData')) || {};
            const finalData = { ...initialData, ...formValues };

            console.log('Form Data Submitted:', finalData);
            props.SendToParent(finalData);

            // Optionally clear localStorage if no longer needed
            localStorage.removeItem('registrationData');

            navigate('/LoginManage');
        } else {
            console.log('Form has validation errors. Cannot submit.');
        }
    };


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2 className='registerh2'>הרשמה</h2>
            <div className='registerdiv'>
                <h2 style={{ textAlign: 'center', margin: 0 }}>פרטים אישיים</h2>
            </div>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="מספר טלפון"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    className='register-textfield'
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="כתובת"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    className='register-textfield'
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="אימייל"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    className='register-textfield'
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    id="password"
                    label="סיסמא"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className='register-textfield'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                /> 
            </FormControl>
            <FormControl fullWidth margin="normal">
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
                        accept="application/pdf"
                        onChange={handleChange}
                    />
                </Button>
                {errors.file && <p>{errors.file}</p>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                המשך
            </Button>
        </form>
    );
}
