import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/StyleSheets/WatchMeal.css';
import EfooterS from '../../Elements/EfooterS';

const WatchMeal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');
    const kindergartenNumber = 2; // Assuming kindergarten number is always 2

    const [mealData, setMealData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`http://localhost:5108/getbydateandkindergarten?date=${date}&kindergartenNumber=${kindergartenNumber}`);
                const data = await response.json();
                setMealData(data);
                setIsDataLoaded(true);
            } catch (error) {
                console.error('Error fetching meal data:', error);
                setIsDataLoaded(true);
            }
        };

        fetchMealData();
    }, [date, kindergartenNumber]);

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
                {isDataLoaded ? (
                    mealData.length > 0 ? (
                        <div className="meal-grid">
                            {mealData.map((meal, index) => (
                                <React.Fragment key={index}>
                                    <div className="meal-time">{meal.mealName}</div>
                                    <div className="meal-description">{meal.mealDetails}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <p>עוד לא הוכנס ארוחות</p>
                    )
                ) : (
                    <p>טוען נתונים...</p>
                )}
                <button className="confirm-button" onClick={handleConfirmClick}>אישור</button>
            </div>
            {EfooterS}
        </div>
    );
};

export default WatchMeal;
