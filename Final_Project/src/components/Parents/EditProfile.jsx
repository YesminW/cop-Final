import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Efooter from '../../Elements/EfooterP';

import '../../assets/StyleSheets/EditProfileP.css';

export default function EditProfile() {
    const [userData, setUserData] = useState({});
    const [child, setchild] = useState({});

    const btnCH = () => {

    }



    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUserP'));
        const urlLC = 'http://localhost:5108/GetChildByParent';

        if (storedUser) {
            setUserData(storedUser);
        }

        console.log(userData.ID)

        fetch(urlLC + '/' + storedUser.ID, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    setchild(result)
                },
                (error) => {
                    console.log("err post=", error);
                }
            )



    }, []);

    return (
        <div>
            <form className="bootstrap-edit-profile-container">
                <h2 className="bootstrap-edit-profile-header"> עריכת פרטים</h2>
                <Link to={{ pathname: "/EditProfileChild", state: child }} className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {child.childFirstName}
                </Link>
                <Link to="/EditProfileP" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.FirstName}
                </Link>
            </form>
            {Efooter}
        </div>
    );
}
