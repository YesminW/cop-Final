import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/RegisterStaff.css';

export default function StaffRegister2() {
  const location = useLocation();
  const details = location.state || {};

  const handleSubmit = () => {


    localStorage.setItem('users', JSON.stringify(details));
    console.log('Updated details:', details);
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
          value={details.userAddress}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="מין"
          name="gender"
          value={details.userGender}
          InputProps={{ readOnly: true }}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="אימייל"
          name="email"
          value={details.userEmail}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="בעיות בריאות"
          name="healthIssues"
          value={details.healthIssues}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שינוי סיסמא"
          type="password"
          name="password"
          value={details.userpPassword}
          variant="outlined"
          className='register-textfield'
        />
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
      {EfooterS}
    </>
  );
}
