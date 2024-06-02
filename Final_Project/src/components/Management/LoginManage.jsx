
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Elogo from '../../Elements/Elogo'


export default function LoginManage() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setErrors] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch data from local storage
        const storedUsers = localStorage.getItem('users');

        const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

        setUsers(parsedUsers);
    }, [])

    const loginUser = () => {
        // Check if the entered username and password match any user
        const foundUser = users.find(users => users.email === mail && users.password === password);

        if (foundUser) {
            // User is authenticated, you can perform further actions
            sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
            navigate('/AddKindergarden')
        } else {
            // Invalid credentials
            setErrors("המייל / הסיסמא שגויים")
        }
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
                    id="mail"
                    label="מייל"
                    name="mail"
                    type="text"
                    variant="outlined"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="custom-textfield"
                />
            </FormControl>
            <FormControl fullWidth margin="normal"  style={{ width: '80%' }}>
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
                <button className="custom-btn" onClick={loginUser}>כניסה</button>
                <Link to="/ManagerRegister">
                    <button className="custom-btn">הרשמה</button>
                </Link>
            </div>
            {error && <p style={{ color: '#6196A6' }}>{error}</p>}
        </div>
    );
}
