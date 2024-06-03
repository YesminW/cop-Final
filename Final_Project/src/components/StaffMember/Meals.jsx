import React, { useState } from 'react';
import EfooterS from '../../Elements/EfooterS';
import '../../assets/StyleSheets/Meals.css';
import { useNavigate } from 'react-router-dom';

export default function Meals() {

    const navigate = useNavigate();

    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        return getWeekDates(currentDate);
    };

    const getWeekDates = (startDate) => {
        const dates = [];
        const startDay = startDate.getDay();
        for (let i = 0; i < 6; i++) { // Calculate dates from Sunday to Friday
            dates.push(new Date(startDate.getTime() + (i - startDay + 1) * 24 * 60 * 60 * 1000));
        }
        return dates;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('he-IL');
    };

    const getWeeksInSchoolYear = () => {
        const weeks = [];
        let date = new Date(new Date().getFullYear(), 8, 1); // Start from September 1st
        const endDate = new Date(date.getFullYear() + 1, 7, 31); // End at August 31st of the next year

        while (date <= endDate) {
            const weekStart = new Date(date);
            const weekEnd = new Date(date);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weeks.push({
                start: formatDate(weekStart),
                end: formatDate(weekEnd)
            });
            date.setDate(date.getDate() + 7);
        }
        return weeks;
    };

    const weeks = getWeeksInSchoolYear();

    const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekDates());

    const handleWeekChange = (event) => {
        const [start, end] = event.target.value.split(' - ');
        const startDate = new Date(start.split('.').reverse().join('-'));
        setSelectedWeek(getWeekDates(startDate));
    };

    const handleDayClick = (date) => {
        const formattedDate = formatDate(date);
        navigate(`/WatchMeal?date=${formattedDate}`);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>מה אוכלים היום</h1>
            </header>
            <div className="date-selector">
                <select onChange={handleWeekChange} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>
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
            {EfooterS}
        </div>
    );
}
