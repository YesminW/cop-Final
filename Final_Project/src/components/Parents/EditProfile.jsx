import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Efooter from '../../Elements/EfooterP';

import '../../assets/StyleSheets/EditProfileP.css';

export default function EditProfile() {
    const [userData, setUserData] = useState({});
    const [child, setChild] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUserP'));
        const urlLC = 'http://localhost:5108/GetChildByParent';

        if (storedUser) {
            setUserData(storedUser);
            fetch(urlLC + '/' + storedUser.ID, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(result => {
                    setChild(result);
                    sessionStorage.setItem('childData', JSON.stringify(result));
                })
                .catch(error => {
                    console.log("Fetch error: ", error);
                });
        }
    }, []);

    const handlePersonalDetailsClick = () => {
        navigate('/EditProfileChild');
    };

    return (
        <div>
            <form className="bootstrap-edit-profile-container">
                <h2 className="bootstrap-edit-profile-header"> עריכת פרטים</h2>
                <button 
                    type="button" 
                    onClick={handlePersonalDetailsClick} 
                    className="btn btn-primary bootstrap-edit-profile-button"
                >
                    פרטים אישיים {child.childFirstName}
                </button>
                <Link to="/EditProfileP" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.FirstName}
                </Link>
            </form>
            {Efooter}
        </div>
    );
}
