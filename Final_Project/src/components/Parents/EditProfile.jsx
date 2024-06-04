import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Efooter from '../../Elements/EfooterP';

import '../../assets/StyleSheets/EditProfileP.css';

export default function EditProfile() {
    const [userData, setUserData] = useState({});
    const [child, setchild] = useState([]);


    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('currentUserP'));
        const urlLC = 'http://localhost:5108/GetChildByParent';

        console.log(storedUser.ID)

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
                const ch = res.json()
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch btnFetchGetStudents= ", result);
                    result.map(st => console.log(st.FullName));
                    console.log('result[0].FullName=', result[0].FullName);
                },
                (error) => {
                    console.log("err post=", error);
                }
            )

            
        if (storedUser) {
            setUserData(storedUser);
        }
    }, []);

    return (
        <div>
            <form className="bootstrap-edit-profile-container">
                <h2 className="bootstrap-edit-profile-header"> עריכת פרטים</h2>
                <Link to="/EditProfileChild" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {child.ChildFirstName}
                </Link>
                <Link to="/EditProfileP" className="btn btn-primary bootstrap-edit-profile-button">
                    פרטים אישיים {userData.FirstName}
                </Link>
            </form>
            {Efooter}
        </div>
    );
}
