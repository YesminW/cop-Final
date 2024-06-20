import { useLocation } from "react-router-dom";
import { fullHourFormat } from "../../utils/functions";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import EfooterS from "../../Elements/EfooterS";

export default function ActivitiesList() {
  const location = useLocation();
  const date = location.state;
  const inputRef = useRef(null);
  const [activities, setActivities] = useState([
    "text",
    "text2",
    "text3",
    "text4",
    "text5",
  ]);

  function addActivity() {
    setActivities((prev) => [...prev, inputRef.current.value]);
    inputRef.current.value = "";
  }

  return (
    <div className="page-container usual-background flex-column space-between page-height-with-footer">
      <div className="flex-row gap-20">
        <span className="rounded-teal-container width-100 font-20">
          {fullHourFormat(date.getHours(), date.getMinutes())}
        </span>
        <button
          disabled
          type="text"
          className="flex-length cool-input padding-h-10px"
        />
      </div>
      <div className="two-column-grid gap-20 scroll">
        {activities.map((activity) => (
          <button
            key={nanoid()}
            className="rounded-teal-container flex-column center activity-background"
            //   onClick={() => handleDayClick(day)}
          >
            <h2 className="font-30">{activity}</h2>
          </button>
        ))}
      </div>
      <div className="flex-column gap-8">
        <input
          ref={inputRef}
          className="font-30 padding-h-10px cool-input height-input"
          placeholder="הקלד פעילות חדשה..."
        />
        <button
          onClick={addActivity}
          className="rounded-teal-container font-30"
        >
          הוספת פעילות
        </button>
      </div>
      {EfooterS}
    </div>
  );
}
