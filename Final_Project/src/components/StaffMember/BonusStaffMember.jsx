import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import NavigationDots from './NavigationDots';


import '../../assets/StyleSheets/BonusStaff.css'

import EfooterS from '../../Elements/EfooterS';

export default function BonusStaffMember() {
    const navigate = useNavigate();

    const handlers = useSwipeable({
        onSwipedRight: () => navigate('/ActivitiesStaffMember'),
        onSwipedLeft: () => navigate('/MainStaffMember'),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="home-container" {...handlers}>
            <header className="header">
                <h1>בונוס</h1>
            </header>
            <div className="main-content">
                <p>כדי להקל עליך, חשבנו איך נוכל לחשוב במקומך, מוזמן/ת לסמן את התחומים שלך ולקבל המלצות לפעילויות בהתאמה</p>
                <div className="grid-container">
                    <button className="grid-item">טבע</button>
                    <button className="grid-item">אוכל</button>
                    <button className="grid-item">ספורט</button>
                    <button className="grid-item">מדעים</button>
                    <button className="grid-item">מוזיקה</button>
                    <button className="grid-item">אומנות</button>
                </div>
                <button className="add-button">הוספת תחום</button>
            </div>
            <footer className="footer">
                <Link to="/StaffRegister">
                    <button className="edit-button">עריכת פרטים אישיים</button>
                </Link>
            </footer>
            <NavigationDots activeIndex={1} />
            {EfooterS}
        </div>
    );
}