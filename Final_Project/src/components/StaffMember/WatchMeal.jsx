import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/StyleSheets/WatchMeal.css";
import EfooterS from "../../Elements/EfooterS";
import { hebrewWeekDays } from "../../utils/constants";
import { formatDate } from "../../utils/functions";
import { nanoid } from "nanoid";

const WatchMeal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const date = location.state;
  const kindergartenNumber = 2; // Assuming kindergarten number is always 2

  const [mealData, setMealData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5108/getbydateandkindergarten?date=${formatDate(
            date
          )}&kindergartenNumber=${kindergartenNumber}`
        );
        const data = await response.json();
        console.log(data);
        setMealData({
          בוקר: "salad",
          צהריים: "meat",
          ארבע: "fruit",
          פינוק: "tapuchips",
        });
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching meal data:", error);
        setIsDataLoaded(true);
      }
    };

    fetchMealData();
  }, [date, kindergartenNumber]);

  const handleConfirmClick = () => {
    navigate("/Meals");
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>מה אוכלים היום</h1>
      </header>
      <form className="meal-info" onSubmit={handleSubmit}>
        <h2>{`${hebrewWeekDays[date.getDay()]} ${formatDate(date)}`}</h2>
        {isDataLoaded ? (
          <table className="meal-table">
            {Object.keys(mealData).map((mealKey) => (
              <tr key={nanoid()}>
                <td className="meal-time">{mealKey}</td>
                <td className="meal-description">
                  <input
                    name={mealKey}
                    defaultValue={mealData[mealKey]}
                  ></input>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <p>טוען נתונים...</p>
        )}
        <button
          type="submit"
          className="confirm-btn"
          //   onClick={handleConfirmClick}
        >
          אישור
        </button>
      </form>
      {EfooterS}
    </div>
  );
};

export default WatchMeal;
