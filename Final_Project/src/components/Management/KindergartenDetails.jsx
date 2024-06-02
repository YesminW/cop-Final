import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function KindergartenDetails() {
    const { gardenName } = useParams();
    const navigate = useNavigate();
    const [sharingType, setSharingType] = useState('');
    const [assistant1, setAssistant1] = useState('');
    const [assistant2, setAssistant2] = useState('');
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const handleSharingTypeChange = (event) => {
        setSharingType(event.target.value);
    };

    const handleAssistant1Change = (event) => {
        setAssistant1(event.target.value);
    };

    const handleAssistant2Change = (event) => {
        setAssistant2(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileType = selectedFile.type;
        const allowedTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (allowedTypes.includes(fileType)) {
            setFile(selectedFile);
            setFileError('');
        } else {
            setFile(null);
            setFileError('יש להעלות קובץ מסוג Excel בלבד (.xls, .xlsx)');
        }
    };

    const handleSubmit = () => {
        // Handle form submission, such as saving details or navigating to another page
        console.log('Form submitted');
        navigate('/KindergartenManagement');
    };

    const handleDelete = () => {
        // Handle delete action
        setSharingType('');
        setAssistant1('');
        setAssistant2('');
        setFile(null);
        setFileError('');
        console.log('Form reset');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
                backgroundColor: '#8aa7a7',
                padding: '20px',
                borderRadius: '10px',
                width: '300px',
                margin: 'auto',
                marginTop: '20px'
            }}
        >
            <Typography variant="h4" style={{ color: 'white', marginBottom: '20px' }}>
                ניהול גנים
            </Typography>
            <Typography
                variant="h5"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.28)',
                    color: 'white',
                    margin: '10px 0',
                    padding: '10px 0',
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: '5px'
                }}
            >
                {decodeURIComponent(gardenName)}
            </Typography>
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel style={{ color: 'white' }}>שיתוף גננות</InputLabel>
                <Select
                    value={sharingType}
                    onChange={handleSharingTypeChange}
                    label="שיתוף גננות"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', color: 'white' }}
                >
                    <MenuItem value="חוד">חוד</MenuItem>
                    <MenuItem value="מסדר">מסדר</MenuItem>
                    <MenuItem value="יניב">יניב</MenuItem>
                    <MenuItem value="שולי">שולי</MenuItem>
                    <MenuItem value="זוהרה">זוהרה</MenuItem>
                </Select>
            </FormControl>

            <Box display="flex" justifyContent="space-between" width="100%" marginTop="16px">
                <FormControl margin="normal" variant="outlined" style={{ flex: 1, marginRight: '8px' }}>
                    <InputLabel style={{ color: 'white' }}>שיתוף סייעת 1</InputLabel>
                    <Select
                        value={assistant1}
                        onChange={handleAssistant1Change}
                        label="שיתוף סייעת 1"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', color: 'white' }}
                    >
                        <MenuItem value="סייעת1">סייעת1</MenuItem>
                        <MenuItem value="סייעת2">סייעת2</MenuItem>
                    </Select>
                </FormControl>

                <FormControl margin="normal" variant="outlined" style={{ flex: 1, marginLeft: '8px' }}>
                    <InputLabel style={{ color: 'white' }}>שיתוף סייעת 2</InputLabel>
                    <Select
                        value={assistant2}
                        onChange={handleAssistant2Change}
                        label="שיתוף סייעת 2"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', color: 'white' }}
                    >
                        <MenuItem value="סייעת1">סייעת1</MenuItem>
                        <MenuItem value="סייעת2">סייעת2</MenuItem>
                    </Select>
                </FormControl>
            </Box>

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
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.28)',
                            color: 'white',
                            marginBottom: 20,
                            width: '100%',
                            height: '60px',
                            fontSize: '18px'
                        }}
                    >
                        העלאת קובץ פרטי ילדים
                    </Button>
                </label>
                {file && <Typography variant="body2" style={{ color: 'white' }}>{file.name}</Typography>}
                {fileError && <Typography variant="body2" style={{ color: 'red' }}>{fileError}</Typography>}
            </FormControl>

            <Button
                variant="contained"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.28)',
                    color: 'white',
                    marginTop: '20px',
                    width: '100%',
                    height: '60px',
                    fontSize: '18px'
                }}
                onClick={handleSubmit}
            >
                שייך
            </Button>
            
            <Button
                variant="contained"
                style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.28)',
                    color: 'white',
                    marginTop: '20px',
                    width: '100%',
                    height: '60px',
                    fontSize: '18px'
                }}
                onClick={handleDelete}
            >
                מחק
            </Button>
        </Box>
    );
}
