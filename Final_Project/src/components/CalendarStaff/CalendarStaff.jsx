import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarStaff() {
    const [date, setDate] = useState(new Date());

    return (
        <div className="page-container week-calendar-container flex-column">
            <Calendar value={date} onChange={setDate} calendarType="hebrew" />
            <div>
                <h2>עדכון לוז</h2>
            </div>
        </div>
    );
}
