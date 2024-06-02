import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


export default function EditProfileParent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Form>
      <Form.Group controlId="formFirstName">
        <Form.Label>שם פרטי</Form.Label>
        <Form.Control
          type="text"
          placeholder="שם פרטי"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={formData.firstName ? 'filled' : ''}
        />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>שם משפחה</Form.Label>
        <Form.Control
          type="text"
          placeholder="שם משפחה"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={formData.lastName ? 'filled' : ''}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>סיסמא</Form.Label>
        <Form.Control
          type="password"
          placeholder="סיסמא"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={formData.password ? 'filled' : ''}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        שלח
      </Button>
    </Form>
  );
}
