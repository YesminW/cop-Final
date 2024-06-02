import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Main from './components/Main'

import LoginManage from './components/Management/LoginManage';
import ManagerRegister from './components/Management/ManagerRegister'
import ManagerRegister2 from './components/Management/ManagerRegister2'
import AddKindergarden from './components/Management/AddKindergarden'
import KindergartenManagement from './components/Management/ManageKinderGarden'
import KindergartenDetails from './components/Management/KindergartenDetails'

import LoginStaffMember from './components/StaffMember/LoginStaffMember'
import MainStaffMember from './components/StaffMember/MainStaffMember'
import ActivitiesStaffMember from './components/StaffMember/ActivitiesStaffMember'
import BonusStaffMember from './components/StaffMember/BonusStaffMember'
import StaffRegister from './components/StaffMember/StaffRegister'
import StaffRegister2 from './components/StaffMember/StaffRegister2'
import Presence from './components/StaffMember/Presence'

import LogInParent from './components/Parents/LogInParent'
import MainParent from './components/Parents/MainParent'
import EditProfile from './components/Parents/EditProfile'
import EditProfileChild from './components/Parents/EditProfileChild'
import EditProfileParent from './components/Parents/EditProfileParent'
import Allergies from './components/Parents/Allergies';

import './assets/StyleSheets/Register.css'
import './assets/StyleSheets/Main.css'
import './App.css'


const apiUtl = '';

function App() {
  const [userArray, setUserArray] = useState([]); //Usestate that holds the array of users

  //function that add user
  const addUserFromRegister = (userFromChild) => {
    setUserArray((prevUserArray) => {
      const newUserArray = [...prevUserArray, userFromChild]; // take the last array of user and add the user that register
      localStorage.setItem("users", JSON.stringify(newUserArray)); //put the new array in the LS
      return newUserArray;
    });
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/LoginManage' element={<LoginManage />} />
          <Route path='/ManagerRegister' element={<ManagerRegister />} />
          <Route path='/ManagerRegister2' element={<ManagerRegister2 SendToParent={addUserFromRegister} />} />
          <Route path='/KindergartenManagement' element={<KindergartenManagement />} />
          <Route path='/KindergartenDetails/:gardenName' element={<KindergartenDetails />} />
          <Route path='/AddKindergarden' element={<AddKindergarden />} />

          <Route path='/LoginStaffMember' element={<LoginStaffMember />} />
          <Route path='/MainStaffMember' element={<MainStaffMember />} />
          <Route path='/ActivitiesStaffMember' element={<ActivitiesStaffMember />} />
          <Route path='/BonusStaffMember' element={<BonusStaffMember />} />
          <Route path='/StaffRegister' element={<StaffRegister />} />
          <Route path='/StaffRegister2' element={<StaffRegister2 />} />
          <Route path='/Presence' element={<Presence />} />

          <Route path='/LogInParent' element={<LogInParent />} />
          <Route path='/MainParent' element={<MainParent />} />
          <Route path='/EditProfile' element={<EditProfile />} />
          <Route path='/EditProfileChild' element={<EditProfileChild />} />
          <Route path='/EditProfileParent' element={<EditProfileParent />} />
          <Route path='/Allergies' element={<Allergies />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
