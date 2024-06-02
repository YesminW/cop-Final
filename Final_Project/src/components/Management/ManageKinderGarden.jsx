import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function KindergartenManagement() {
    const navigate = useNavigate();
    const [kindergartens, setKindergartens] = useState([
        'בית תינוקות',
        'פנטון ניצן',
        'גוון שקד',
        'גן רימון',
        'גן חצב'
    ]);

    useEffect(() => {
        // Load additional kindergarten from localStorage only if it hasn't been added in this session
        if (!localStorage.getItem('kindergartenAdded')) {
            const additionalKindergarten = JSON.parse(localStorage.getItem('AddKindergarden'));
            if (additionalKindergarten && additionalKindergarten.gardenName) {
                setKindergartens((prevKindergartens) => [
                    ...prevKindergartens,
                    additionalKindergarten.gardenName
                ]);
            }
        }
    }, []);

    const handleAddKindergarten = () => {
        navigate('/AddKindergarden');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{
                backgroundColor: '#8aa7a7',
                padding: '20px',
                borderRadius: '10px',
                width: '300px',
                margin: 'auto',
                marginTop: '20px'
            }}
        >
            <Typography variant="h4" style={{ color: 'white', marginBottom: '20px' }}>
                ניהול גנים
            </Typography>
            {kindergartens.map((kindergarten, index) => (
                <Link key={index}
                    to={`/KindergartenDetails/${encodeURIComponent(kindergarten)}`}
                    style={{ textDecoration: 'none', width: '100%' }} >
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.28)',
                            color: 'white',
                            margin: '10px 0',
                            width: '250px', // Increase width
                            height: '60px', // Increase height
                            fontSize: '18px' // Increase font size
                        }}
                    >
                        {kindergarten}
                    </Button>
                </Link>
            ))}
            <Button
                variant="contained"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.28)',
                    color: 'white',
                    marginTop: '20px'
                }}
                onClick={handleAddKindergarten}
            >
                הוספת גן
            </Button>
        </Box>
    );
}
