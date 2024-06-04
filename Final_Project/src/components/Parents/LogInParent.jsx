import React, { useState } from 'react'
import Elogo from '../../Elements/Elogo'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function LogInParent() {

    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setErrors] = useState('');
    const navigate = useNavigate();

    const loginUser = () => {
        const urlLs = 'http://localhost:5108/LogIn';
        fetch(urlLs + '/' + ID + '/' + password, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text(); // מקבל את התשובה כמחרוזת
          })
          .then(text => {
            if (text.includes("Invalid credentials")) { // בדיקת השגיאה מהשרת
              setErrors("המייל / הסיסמא שגויים");
              throw new Error('Invalid credentials');
            } else {
              // כאן נתייחס למחרוזת כאילו היא מכילה רק את השם הפרטי
              const userInfo = {
                ID,
                FirstName: text // השם הפרטי שהתקבל מהמחרוזת
              };
              sessionStorage.setItem('currentUserP', JSON.stringify(userInfo));
              navigate('/MainStaffMember');
            }
          })
          .catch(error => {
            setErrors("המייל / הסיסמא שגויים");
            console.error('There was a problem with the fetch operation:', error);
          });
      };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div>
            {Elogo}
            <br />
            <FormControl fullWidth margin="normal" style={{ width: '80%' }}>
                <TextField
                    id="ID"
                    label="שם משתמש"
                    name="ID"
                    type="text"
                    variant="outlined"
                    value={ID}
                    onChange={(e) => setID(e.target.value)}
                    className="custom-textfield"
                />
            </FormControl>
            <FormControl fullWidth margin="normal" style={{ width: '80%' }}>
                <TextField
                    id="password"
                    label="סיסמא"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-textfield"
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
            <div className="buttons">
                <button className="btn" onClick={loginUser}>כניסה</button>
            </div>
            {error && <p style={{ color: '#6196A6' }}>{error}</p>}
        </div>
    )
}
