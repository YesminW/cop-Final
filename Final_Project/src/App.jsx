import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import First from "./components/First";
import LoginManage from "./components/Management/LoginManage";
import ManagerRegister from "./components/Management/ManagerRegister";
import ManagerRegister2 from "./components/Management/ManagerRegister2";
import AddKindergarden from "./components/Management/AddKindergarden";
import AddsAndP from "./components/Management/AddSAndP";
import KindergartenManagement from "./components/Management/ManageKinderGarden";
import KindergartenDetails from "./components/Management/KindergartenDetails";

import LoginStaffMember from "./components/StaffMember/LoginStaffMember";
import MainStaffMember from "./components/StaffMember/MainStaffMember";
import ActivitiesStaffMember from "./components/StaffMember/ActivitiesStaffMember";
import BonusStaffMember from "./components/StaffMember/BonusStaffMember";
import EditProfileS from "./components/StaffMember/EditProfileS";
import EditProfileS2 from "./components/StaffMember/EditProfileS2";
import Presence from "./components/StaffMember/Presence";
import Meals from "./components/StaffMember/Meals";
import WatchMeal from "./components/StaffMember/WatchMeal";
import AddMeal from "./components/StaffMember/AddMeal";
import ChildDuty from "./components/StaffMember/ChildDuty";
import TeamStaff from "./components/StaffMember/TeamStaff";
import BirthDayChild from "./components/StaffMember/BirthDayChild";

import MainParent from "./components/Parents/MainParent";
import EditProfile from "./components/Parents/EditProfile";
import EditProfileChild from "./components/Parents/EditProfileChild";
import EditProfileP from "./components/Parents/EditProfileP";
import Allergies from "./components/Parents/Allergies";

import "./assets/StyleSheets/Register.css";
import "./assets/StyleSheets/Main.css";
import "./App.css";
import WeekCalendar from "./components/WeekCalendar/WeekCalendar";
import DayHoursList from "./components/DayHoursList/DayHoursList";
import ActivitiesList from "./components/ActivitiesList/ActivitiesList";
import LoginParent from "./components/Parents/LogInParent";
import CalendarStaff from "./components/CalendarStaff/CalendarStaff";
import ChatsList from "./components/chat/ChatsList";
import Chat from "./components/chat/Chat";
const apiUtl = "";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/ChatList" element={<ChatsList />} />
          <Route path="/WeekCalendar" element={<WeekCalendar />} />
          <Route path="/WatchDayHourList" element={<DayHoursList />} />
          <Route path="/ActivitiesList" element={<ActivitiesList />} />

          <Route path="/LoginManage" element={<LoginManage />} />
          <Route path="/ManagerRegister" element={<ManagerRegister />} />
          <Route path="/ManagerRegister2" element={<ManagerRegister2 />} />
          <Route
            path="/KindergartenManagement"
            element={<KindergartenManagement />}
          />
          <Route
            path="/KindergartenDetails/:gardenName"
            element={<KindergartenDetails />}
          />
          <Route path="/AddKindergarden" element={<AddKindergarden />} />
          <Route path="AddSAndP" element={<AddsAndP />} />

          <Route path="/LoginStaffMember" element={<LoginStaffMember />} />
          <Route path="/MainStaffMember" element={<MainStaffMember />} />
          <Route
            path="/ActivitiesStaffMember"
            element={<ActivitiesStaffMember />}
          />
          <Route path="/BonusStaffMember" element={<BonusStaffMember />} />
          <Route path="/EditProfileS" element={<EditProfileS />} />
          <Route path="/EditProfileS2" element={<EditProfileS2 />} />
          <Route path="/Presence" element={<Presence />} />
          <Route path="/Meals" element={<Meals />} />
          <Route path="/WatchMeal" element={<WatchMeal />} />
          <Route path="/AddMeal" element={<AddMeal />} />
          <Route path="/ChildDuty" element={<ChildDuty />} />
          <Route path="/TeamStaff" element={<TeamStaff />} />
          <Route path="/BirthDayChild" element={<BirthDayChild />} />

          <Route path="/LogInParent" element={<LoginParent />} />
          <Route path="/MainParent" element={<MainParent />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/EditProfileChild" element={<EditProfileChild />} />
          <Route path="/EditProfileP" element={<EditProfileP />} />
          <Route path="/Allergies" element={<Allergies />} />
          <Route path="/CalendarStaff" element={<CalendarStaff />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
