import React, { useState } from 'react'
import EfooterS from '../../Elements/EfooterS';

export default function Meals() {
    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        return getWeekDates(currentDate);
    };

    const getWeekDates = (startDate) => {
        const dates = [];
        const startDay = startDate.getDay();
        for (let i = 0; i < 7; i++) {
            dates.push(new Date(startDate.getTime() + (i - startDay + 1) * 24 * 60 * 60 * 1000));
        }
        return dates;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('he-IL');
    };

    const getWeeksInYear = (year) => {
        const weeks = [];
        let date = new Date(year, 0, 1);
        while (date.getFullYear() === year) {
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

    const currentYear = new Date().getFullYear();
    const weeks = getWeeksInYear(currentYear);

    const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekDates());

    const handleWeekChange = (event) => {
        const [start, end] = event.target.value.split(' - ');
        const startDate = new Date(start.split('.').reverse().join('-'));
        setSelectedWeek(getWeekDates(startDate));
    };

    return (
        <div className="container">
            <header className="header">
                <h1>מה אוכלים היום</h1>
            </header>
            <div className="date-selector">
                <select onChange={handleWeekChange}>
                    {weeks.map((week, index) => (
                        <option key={index} value={`${week.start} - ${week.end}`}>
                            {week.start} - {week.end}
                        </option>
                    ))}
                </select>
            </div>
            <div className="day-grid">
                {selectedWeek.map((date, index) => (
                    <div key={index} className="day">
                        {["יום א'", "יום ב'", "יום ג'", "יום ד'", "יום ה'", "יום ו'", "שבת"][index]} <br /> {formatDate(date)}
                    </div>
                ))}
            </div>
            {EfooterS}
        </div>


    )
}
