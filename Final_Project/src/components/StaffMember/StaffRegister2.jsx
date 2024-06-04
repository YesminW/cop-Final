import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/RegisterStaff.css';

export default function StaffRegister2() {
  const location = useLocation();
  const details = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = () => {

    const urlSR = 'http://localhost:5108/updateUser';

    fetch(urlSR + '/' + details.userId, {
      method: 'PUT',
      body: JSON.stringify(details),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
      })
    })
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          console.log(result.Avg);
          navigate('/MainStaffMember')
        },
        (error) => {
          console.log("err post=", error);
        });
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
