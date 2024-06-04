import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import EfooterP from '../../Elements/EfooterP';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function EditProfileP() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    userPrivetName: '',
    userSurname: '',
    userId: '',
    userBirthDate: '',
    userPhoneNumber: '',
    userGender: '',
    userEmail: '',
    userpPassword: '',
    userAddress: ''
});

  useEffect(() => {
    const storedDetails = JSON.parse(sessionStorage.getItem('currentUserP'));

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
    navigate('/MainParent', { state: details });
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
          label="תעודת זהות"
          value={details.userId}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
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
          label="כתובת"
          value={details.userAddress}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="מייל"
          value={details.userEmail}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שינוי סיסמא"
          type='password'
          name="password"
          value={details.userpPassword}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="פלאפון"
          name="phoneNumber"
          value={details.userPhoneNumber}
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
  );
}
