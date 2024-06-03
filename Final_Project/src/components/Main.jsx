
import React from 'react'
import { Link } from 'react-router-dom'

import Elogo from '../Elements/Elogo'

import '../assets/StyleSheets/Main.css'


export default function Main() {
    const apiUrl = 'http://localhost:5108/getAllUsers'

    const btncheck = () => {
        fetch(apiUrl, {
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
                    console.log("fetch btnFetchGetStudents= ", result);
                    result.map(st => console.log(st.FullName));
                    console.log('result[0].FullName=', result[0].FullName);
                },
                (error) => {
                    console.log("err post=", error);
                });
    }

    return (
        <div>
            {Elogo}
            <br />
            <h1 className="loginh1">מי אתה/את?</h1>
            <div className="buttons">
                <Link to="/LogInParent">
                    <button className="btn">הורה</button>
                </Link>
                <Link to="/LoginStaffMember">
                    <button className="btn">איש צוות</button>
                </Link>
            </div>
            <div>
                <Link to="/LoginManage">
                    <button className="btn">מנהל/ת חינוך</button>
                </Link>
            </div>
            <button onClick={btncheck} className="btn">בדיקה</button>
        </div>
    );
}