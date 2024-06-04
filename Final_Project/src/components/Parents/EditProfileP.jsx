import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import EfooterP from '../../Elements/EfooterP';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function EditProfileP() {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
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


    const urldos = 'http://localhost:5108/GetOneUser';

    fetch(urldos + '/' + storedDetails.ID, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
      .then(response => response.json())
      .then(
        (data) => {
          const userData = Array.isArray(data) ? data[0] : data;
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
        (error) => {
          console.log(error)
        })
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      console.log('Uploaded file:', file);
      setFile(file)
    } else {
      alert('יש להעלות קובץ מסוג JPG או JPEG בלבד.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // להימנע מטעינת עמוד מחדש
    const urlSP = 'http://localhost:5108/updateUser';

    fetch(urlSP + '/' + details.userId, {
      method: 'PUT',
      body: JSON.stringify(details),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          if (file) {
            const urlphotol = 'http://localhost:5108/UploadUserPhoto';
            const formData = new FormData();
            formData.append("file", file);

            fetch(urlphotol + '/' + details.userId, {
              method: 'PUT',
              body: formData,
            })
              .then(res => {
                if (!res.ok) {
                  throw new Error('Network response was not ok');
                }
                return res.json();
              })
              .then(
                () => {
                  navigate('/MainParent');
                },
                (error) => {
                  console.log("err post=", error);
                });
          } else {
            navigate('/MainParent');
          }
        },
        (error) => {
          console.log("err post=", error);
        });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ backgroundColor: '#cce7e8', padding: 10, borderRadius: 5, marginBottom: 10 }}>
          <h2 style={{ textAlign: 'center', margin: 0 }}> פרטים אישיים {details.userPrivetName} </h2>
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
          name="userPrivetName"
          InputProps={{ readOnly: true }}
          value={details.userPrivetName}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שם משפחה"
          InputProps={{ readOnly: true }}
          name="userSurname"
          value={details.userSurname}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="כתובת"
          name="userAddress"
          value={details.userAddress}
          onChange={handleInputChange}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="מייל"
          name="userEmail"
          value={details.userEmail}
          onChange={handleInputChange}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="פלאפון"
          name="userPhoneNumber"
          value={details.userPhoneNumber}
          onChange={handleInputChange}
          variant="outlined"
          className='register-textfield'
        />
        <TextField
          fullWidth
          margin="normal"
          label="שינוי סיסמא"
          type='password'
          name="userpPassword"
          value={details.userpPassword}
          onChange={handleInputChange}
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
            margin: '10px',
            backgroundColor: '#076871',
            '&:hover': {
              backgroundColor: '#6196A6',
            },
            fontSize: '15px'
          }}
        >
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
          type='submit'
        >
          אישור
        </Button>
      </form>
      {EfooterP}
    </>
  );
}
