import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/StyleSheets/WatchMeal.css';
import EfooterS from '../../Elements/EfooterS';


const WatchMeal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');

    const handleConfirmClick = () => {
        navigate('/Meals');
    };

    return (
        <div className="container">
            <header className="header">
                <h1>מה אוכלים היום</h1>
            </header>
            <div className="meal-info">
                <h2>{`יום א' ${date}`}</h2>
                <div className="meal-grid">
                    <div className="meal-time">בוקר</div>
                    <div className="meal-time">צהריים</div>
                    <div className="meal-time">ערב</div>
                </div>
                <button className="confirm-button" onClick={handleConfirmClick}>אישור</button>
            </div>
            {EfooterS}
        </div>
    );
};

export default WatchMeal;
