
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';


import Elogo1 from '../../Elements/Elogo1';
import Efooter from '../../Elements/EfooterP';
import '../../assets/StyleSheets/MainStaff.css';


export default function MainParent() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUserP'));

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

    return (
    <div className='centered-text'>
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
          <h3>שליחת הודעה לגננת</h3>
        </div>
      </div>
      <div>
        <div className='grid-item'>
          <h3>האירוע הבא ביום</h3>
        </div>
        <div className='grid-item'>
          <h3>מה אוכלים היום?</h3>
        </div>
        <div className='grid-item'>
          <Link to='/EditProfile'>
            <h3>עריכת פרטים</h3>
          </Link>
        </div>
      </div>
      {Efooter}
    </div>
  );
}