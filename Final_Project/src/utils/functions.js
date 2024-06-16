export const getCurrentWeekDates = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const currentWeekDay = currentDate.getDay();
  const startDate = new Date(
    currentDate.setDate(currentDate.getDate() - currentWeekDay)
  );
  return getWeekDates(startDate);
};

export const getWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 6; i++) {
    // Calculate dates from Sunday to Friday
    dates.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
  }
  return dates;
};

export const getWeeksInSchoolYear = () => {
  const weeks = [];
  const date = new Date(2023, 8, 3); // Start from September 1st, 2023
  const endDate = new Date(2024, 8, 3); // End at September 1st, 2024

  while (date <= endDate) {
    const weekStart = new Date(date);
    const weekEnd = new Date(date);
    weekEnd.setDate(weekEnd.getDate() + 5); // 6 days to include from Sunday to Friday
    weeks.push({
      start: weekStart,
      end: weekEnd,
    });
    date.setDate(date.getDate() + 7);
  }
  return weeks;
};

export const formatDate = (date) => {
  return date.toLocaleDateString("he-IL");
};

export const formatForCSharp = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
