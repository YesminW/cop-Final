import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Efooter from '../../Elements/EfooterP';

import '../../assets/StyleSheets/EditProfileP.css';

export default function EditProfile() {
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUserP'));

        if (storedUser) {
            setUserData(storedUser);
        }
    }, []);

    return (
        <div>
            <form className="bootstrap-edit-profile-container">
                <h2 className="bootstrap-edit-profile-header"> עריכת פרטים</h2>
                <Link to="/EditProfileChild" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.FirstName}
                </Link>
                <Link to="/EditProfileP" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.FirstName}
                </Link>
            </form>
            {Efooter}
        </div>
    );
}
