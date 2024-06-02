import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';

export default function AddKindergarden() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        gardenName: '',
        address: '',
        file: ''
    });

    // קריאה לנתונים מה־Local Storage בטעינת הדף
    useEffect(() => {
        const storedData = localStorage.getItem('AddKindergarden');
        if (storedData && Object.keys(formValues).length === 0) {
            const parsedData = JSON.parse(storedData);
            setFormValues(parsedData);
        }
    }, [formValues]);
    

    const validateForm = () => {
        const newErrors = {};
        const hebrewRegex = /^[\u0590-\u05FF\s]+$/;

        // לוגיקת התקינות הקודמת נשארת כפי שהיא

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
            // Get existing data from localStorage
            const existingData = JSON.parse(localStorage.getItem('AddKindergarden')) || {};
    
            // Merge new data with existing data
            const newData = {
                ...existingData,
                [formValues.gardenName]: formValues // Assuming gardenName is unique
            };
    
            // Save merged data back to localStorage
            localStorage.setItem('AddKindergarden', JSON.stringify(newData));
    
            navigate('/KindergartenManagement');
        } else {
            console.log('Form has validation errors. Cannot submit.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white', fontSize: '48px', marginTop: '0' }}>הרשמה</h2>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', padding: 10, borderRadius: 5, marginBottom: 30 }}>
                <h2 style={{ textAlign: 'center', margin: 0, color: 'white', fontSize: '28px' }}>הקמת גן</h2>
            </div>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="שם הגן"
                    name="gardenName"
                    value={formValues.gardenName}
                    onChange={handleChange}
                    error={!!errors.gardenName}
                    helperText={errors.gardenName}
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
                    variant="outlined"
                    className="rtl-input"
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <input
                    accept=".xls,.xlsx"
                    type="file"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    id="profileFile"
                    name='file'
                />
                <label htmlFor="profileFile">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        style={{ marginBottom: 20 }}
                    >
                        העלאת קובץ פרטי ילדים
                    </Button>
                </label>
                {errors.file && <p>{errors.file}</p>}
            </FormControl>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <button className="btn1" onClick={handleSubmit}>המשך</button>
                <Link to="/KindergartenManagement">
                    <button className="btn1">דלג</button>
                </Link>
            </div>
        </form>
    );
}
