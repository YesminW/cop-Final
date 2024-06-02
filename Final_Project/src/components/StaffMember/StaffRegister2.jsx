import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/RegisterStaff.css';

export default function StaffRegister2() {
  const location = useLocation();
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    gender: '',
    email: '',
    healthIssues: '',
    password: '',
  });

  useEffect(() => {
    const storedDetails = JSON.parse(sessionStorage.getItem('currentUser'));
    if (storedDetails) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        ...storedDetails,
      }));
    }
    if (location.state) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        ...location.state,
      }));
    }
  }, [location.state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem('users', JSON.stringify(details));
    console.log('Updated details:', details);
    // כאן ניתן להוסיף לוגיקה נוספת אם צריך
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
          label="כתובת"
          name="address"
          value={details.address}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="מין"
          name="gender"
          value={details.gender}
          InputProps={{ readOnly: true }}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="אימייל"
          name="email"
          value={details.email}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="בעיות בריאות"
          name="healthIssues"
          value={details.healthIssues}
          onChange={handleInputChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="שינוי סיסמא"
          type="password"
          name="password"
          value={details.password}
          onChange={handleInputChange}
          variant="outlined"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          אישור
        </Button>
      </form>
      {EfooterS}
    </>
  );
}
