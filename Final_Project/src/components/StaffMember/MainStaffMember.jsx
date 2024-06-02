import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import { useSwipeable } from 'react-swipeable';
import NavigationDots from './NavigationDots';


import Elogo1 from '../../Elements/Elogo1';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/MainStaff.css';
import { Button } from '@mui/material';

export default function MainStaffMember() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (storedUser) {
      setUserData(storedUser);
    }

    setGreeting(getGreeting());

    const today = new Date();
    setCurrentDay(format(today, 'EEEE', { locale: he }));
    setCurrentDate(format(today, 'dd/MM/yyyy'));
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'בוקר טוב';
    } else if (currentHour < 18) {
      return 'צהריים טובים';
    } else {
      return 'ערב טוב';
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: () => navigate('/BonusStaffMember'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="home-container" {...handlers}>
      {Elogo1}
      <br />
      <div className='info-card'>
        <h2>{greeting} {userData.firstName}</h2>
      </div>
      <div className="grid-container">
        <div className='grid-item'>
          <h3>{currentDay} <br /> {currentDate}</h3>
        </div>
        <div className='grid-item'>
          <Link to='/presence'>
            <Button>נוכחים בגן</Button>
          </Link>
        </div>
      </div>
      <div>
        <div className='grid-item'>
          <h3>תורנים להיום</h3>
        </div>
        <div className='grid-item'>
          <h3>מי חוגג היום</h3>
        </div>
        <div className='grid-item'>
          <h3>האירוע הבא היום</h3>
        </div>
      </div>
      <NavigationDots activeIndex={0} />
      {EfooterS}
    </div>
  );
}
