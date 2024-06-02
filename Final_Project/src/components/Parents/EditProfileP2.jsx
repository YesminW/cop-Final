import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EfooterP from '../../Elements/EfooterP';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormControl } from 'react-bootstrap';


export default function EditProfileP2() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  });

  useEffect(() => {
    const storedDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    if (storedDetails) {
      setDetails({
        firstName: storedDetails.firstName || '',
        lastName: storedDetails.lastName || '',
        email: storedDetails.email || '',
        phoneNumber: storedDetails.phoneNumber || '',
        address: storedDetails.address || '',
        password: storedDetails.password || '',
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
    navigate('/EditProfile', { state: details });
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
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שם משפחה"
          value={details.lastName}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="כתובת"
          value={details.address}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="מייל"
          value={details.email}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שינוי סיסמא"
          type='password'
          name="password"
          value={details.password}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="פלאפון"
          name="phoneNumber"
          value={details.phoneNumber}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
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
            onChange={handleFileUpload}
          />
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          type='submit'
        >
          אישור
        </Button>
      </form>
      {EfooterP}
    </>
  )
}
