import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EfooterS from '../../Elements/EfooterS';
import defaultimg from '../../Images/default.png';


import '../../assets/StyleSheets/Presence.css';

export default function Presence() {
    const [student, setstudent] = useState([])




    const togglePresence = (id) => {
        setPresence(prevPresence =>
            prevPresence.map(student =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    return (
        <>
            <div className='presencetitle'>
                <h2 className='presencetitleText'>נוכחות</h2>
            </div>
            <Container className="presence-container">
                <Box className="header">
                    <Box className="search-box" >
                        <input type="text" placeholder="חיפוש" className="search-input" />
                        <IconButton style={{ color: '#07676D' }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Button style={{ backgroundColor: 'white', color: '#07676D', fontFamily: 'Karantina', fontSize: '18px', borderRadius: '5px' }}>
                        צ'אט עם הורה
                    </Button>
                </Box>
                <Box className="students-grid">
                    {presence.map(student => (
                        <Box
                            key={student.id}
                            className={`student-circle ${student.present ? 'present' : ''}`}
                            onClick={() => togglePresence(student.id)}
                        >
                            <Avatar src={student.imgSrc} alt={student.name} className="student-avatar" />
                            <Typography style={{ fontFamily: 'Karantina', fontSize: '15px' }} className="student-name">
                                {student.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                {EfooterS}
            </Container>
        </>
    );
}
