import React, { useState } from 'react';
import { TextField, Button, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';

export default function AddKindergarden() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        KindergartenName: '',
        KindergartenAddress: '',
    });

    const [file, setFile] = useState('');

    const validateForm = () => {
        const newErrors = {};
        const hebrewRegex = /^[\u0590-\u05FF\s]+$/;

        if (!hebrewRegex.test(formValues.KindergartenName)) {
            newErrors.KindergartenName = 'יש למלא בשפה העברית בלבד';
        }

        if (!hebrewRegex.test(formValues.KindergartenAddress)) {
            newErrors.KindergartenAddress = 'יש למלא בשפה העברית בלבד';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (fileExtension === 'xls' || fileExtension === 'xlsx') {
                setFile(selectedFile);
                setErrors((prevErrors) => ({ ...prevErrors, file: '' }));
            } else {
                setFile(null);
                setErrors((prevErrors) => ({ ...prevErrors, file: 'Invalid file type. Only .xls and .xlsx are allowed.' }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const apiurl = 'http://localhost:5108/AddKindergarten';
            const urlExcelC = 'http://localhost:5108/AddChildrenByExcel';

            const formData = new FormData();
            formData.append('file', file);

            try {
                const [addKindergartenResponse, addUserByExcelResponse] = await Promise.all([
                    fetch(apiurl + '/' + formValues.KindergartenName + '/' + formValues.KindergartenAddress, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then(res => {
                        if (!res.ok) throw new Error('Failed to add kindergarten');
                        return res.json();
                    }),
                    fetch(urlExcelC, {
                        method: 'POST',
                        body: formData,
                    }).then(res => {
                        if (!res.ok) throw new Error('Failed to add Childs by excel');
                        return res.json();
                    })
                ]);

                navigate('/KindergartenManagement');
            } catch (error) {
                console.error('Error:', error);
            }
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

            <FormControl fullWidth margin="normal" className='register-textfield'>
                <TextField
                    label="שם הגן"
                    name="KindergartenName"
                    value={formValues.KindergartenName}
                    onChange={handleChange}
                    error={!!errors.KindergartenName}
                    helperText={errors.KindergartenName}
                    variant="outlined"
                />
            </FormControl>

            <FormControl fullWidth margin="normal" className='register-textfield'>
                <TextField
                    label="כתובת"
                    name="KindergartenAddress"
                    value={formValues.KindergartenAddress}
                    onChange={handleChange}
                    error={!!errors.KindergartenAddress}
                    helperText={errors.KindergartenAddress}
                    variant="outlined"
                    className="rtl-input"
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <input
                    accept=".xls,.xlsx"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="profileFile"
                />
                <label htmlFor="profileFile">
                    <Button
                        variant="contained"
                        component="span"
                        style={{ marginBottom: 20 }}
                        sx={{
                            fontFamily: 'Karantina',
                            fontSize: '20px',
                            margin: '20px',
                            color: 'white',
                            backgroundColor: '#076871',
                            '&:hover': {
                                backgroundColor: '#6196A6',
                            }
                        }}
                    >
                        העלאת קובץ פרטי ילדים
                        {<CloudUploadIcon style={{ margin: "10px" }} />}
                    </Button>
                </label>
                {errors.file && <p>{errors.file}</p>}
            </FormControl>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                <button className="btn1">המשך</button>
                <Link to="/KindergartenManagement">
                    <button className="btn1">חזור</button>
                </Link>
            </div>
        </form>
    );
}
