import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Efooter from '../../Elements/EfooterP';

import '../../assets/StyleSheets/EditProfileP.css';

export default function EditProfile() {
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (storedUser) {
            setUserData(storedUser);
        }
    }, []);

    return (
        <div>
            <form className="bootstrap-edit-profile-container">
                <h2 className="bootstrap-edit-profile-header"> עריכת פרטים</h2>
                <Link to="/EditProfileChild" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.firstName}
                </Link>
                <Link to="/EditProfileParent" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.firstName}
                </Link>
            </form>
            {Efooter}
        </div>
    );
}
