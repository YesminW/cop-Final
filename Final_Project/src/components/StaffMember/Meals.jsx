import React, { useState, useEffect } from 'react';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/Meals.css';
import { useNavigate } from 'react-router-dom';

export default function Meals() {

    const navigate = useNavigate();

    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay();
        const startDate = new Date(currentDate.setDate(currentDate.getDate() - currentWeekDay + 1));
        return getWeekDates(startDate);
    };

    const getWeekDates = (startDate) => {
        const dates = [];
        for (let i = 0; i < 6; i++) { // Calculate dates from Sunday to Friday
            dates.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
        }
        return dates;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('he-IL');
    };

    const getWeeksInSchoolYear = () => {
        const weeks = [];
        let date = new Date(2023, 8, 1); // Start from September 1st, 2023
        const endDate = new Date(2024, 8, 1); // End at September 1st, 2024

        while (date <= endDate) {
            const weekStart = new Date(date);
            const weekEnd = new Date(date);
            weekEnd.setDate(weekEnd.getDate() + 5); // 6 days to include from Sunday to Friday
            weeks.push({
                start: formatDate(weekStart),
                end: formatDate(weekEnd)
            });
            date.setDate(date.getDate() + 7);
        }
        return weeks;
    };

    const weeks = getWeeksInSchoolYear();

    const [selectedWeek, setSelectedWeek] = useState([]);
    const [selectedWeekRange, setSelectedWeekRange] = useState('');

    useEffect(() => {
        const currentWeekDates = getCurrentWeekDates();
        setSelectedWeek(currentWeekDates);
        const start = formatDate(currentWeekDates[0]);
        const end = formatDate(currentWeekDates[currentWeekDates.length - 1]);
        setSelectedWeekRange(`${start} - ${end}`);
    }, []);

    const handleWeekChange = (event) => {
        const [start] = event.target.value.split(' - ');
        const startDate = new Date(start.split('.').reverse().join('-'));
        const weekDates = getWeekDates(startDate);
        setSelectedWeek(weekDates);
        setSelectedWeekRange(event.target.value);
    };

    const handleDayClick = (date) => {
        const formattedDate = formatDate(date);
        navigate(`/WatchMeal?date=${formattedDate}`);
    };

    const handleAddMealClick = () => {
        navigate('/AddMeal');
    };

    return (
        <div className="container">
            <header className="headermeals">
                <h1 style={{ fontSize: '48px' }}>מה אוכלים היום</h1>
            </header>
            <div className="date-selector">
                <select
                    onChange={handleWeekChange}
                    value={selectedWeekRange}
                    style={{ width: '100%', padding: '10px', fontSize: '30px' }}>
                    {weeks.map((week, index) => (
                        <option key={index} value={`${week.start} - ${week.end}`}>
                            {week.start} - {week.end}
                        </option>
                    ))}
                </select>
            </div>
            <div className="day-grid">
                {selectedWeek.map((date, index) => (
                    <button key={index} className="day-button" onClick={() => handleDayClick(date)}>
                        {["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", "שבת"][index]} <br /> {formatDate(date)}
                    </button>
                ))}
            </div>
            <div className="add-meal-button">
                <button onClick={handleAddMealClick} style={{ width: '100%', padding: '10px', fontSize: '25px', marginTop: '10px' }}>
                    הוספת תפריט ארוחות עתידי
                </button>
            </div>
            {EfooterS}
        </div>
    );
}
