import React, { useState } from 'react';
import { Button, FormControl } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';

export default function AddsAndP() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [file, setFile] = useState('');

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        const filename = selectedFile.name
        if (selectedFile) {
            const fileExtension = filename.split('.').pop().toLowerCase();
            if (fileExtension === 'xls' || fileExtension === 'xlsx') {
                setFile(selectedFile);
                setErrors((prevErrors) => ({ ...prevErrors, file: '' }));
            } else {
                setFile(null);
                setErrors((prevErrors) => ({ ...prevErrors, file: 'Please upload a valid Excel file (.xls or .xlsx)' }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlExcelS = 'http://localhost:5108/AddUserByExcel';
        const formData = new FormData();
        formData.append("file", file);

        fetch(urlExcelS, {
            method: 'POST',
            body: formData,
        })
            .then(res => {
                console.log('res=', res);
                return res.json()
            })
            .then(
                (result) => {
                    navigate('/KindergartenManagement')
                },
                (error) => {
                    console.log("err post=", error);
                });

    };


    return (
        <form onSubmit={handleSubmit}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', padding: 10, borderRadius: 5, marginBottom: 30 }}>
                <h2 style={{ textAlign: 'center', margin: 0, color: 'white', fontSize: '28px' }}>הוספת משתמשים</h2>
            </div>

            <FormControl fullWidth margin="normal">
                <label htmlFor="profileFile">
                    <input
                        accept=".xls,.xlsx"
                        type="file"
                        id="profileFile"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
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
                        העלאת קובץ משתמשים
                        <CloudUploadIcon style={{ margin: "10px" }} />
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
