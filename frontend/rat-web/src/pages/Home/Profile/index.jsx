import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router'

import axios from 'axios'

import InfoForm from '../../../components/InfoForm'

import ProfileCard from '../../../components/ProfileCard'

import './index.css'


export default function Profile(props) {
    const [userInfo, setInfo] = useState({username:'', first_name:'', last_name:'', gender:'', email:''});
    const location = useLocation;

    useEffect(()=> {
        const {userId, clearupToken} = props;
        axios.get(`/api1/users/${userId}`,
                    {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}}
                ).then(response=>{
                    console.log('----')
                    console.log(response.data);
                    setInfo(response.data);
                }).catch(e => {
                    console.log(props)
                    if (e.response.status === 401) clearupToken();
                    else alert(e);
                })
    },[location])

    const handleUser = (type) => {
        return (event) => {
            switch (type) {
                case 'username':
                    const newUsername = event.target.value;
                    userInfo.username = newUsername;
                    setInfo(userInfo);
                    break;
                case 'surname':
                    const newSurname = event.target.value;
                    userInfo.last_name = newSurname;
                    setInfo(userInfo);
                    break;
                case 'firstname':
                    const newFirstname = event.target.value;
                    userInfo.first_name = newFirstname;
                    setInfo(userInfo);
                    break;
                case 'gender':
                    const newGender = event.target.value;
                    userInfo.gender = newGender;
                    setInfo(userInfo);
                    break;
                case 'email':
                    const newEmail = event.target.value;
                    userInfo.email = newEmail;
                    setInfo(userInfo);
                    break;
                case 'password':
                    const newPassword = event.target.value;
                    userInfo.password = newPassword;
                    setInfo(userInfo);
                    break;
                default:
                    break;
            }
        }

    }

    // Define the function to upload the data
    const updateUser = (event) => {
        event.preventDefault();
        const {userId, clearupToken} = props;
        console.log(userInfo)
        axios.patch(`/api1/users/${userId}`,
                    userInfo,
                    {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}}
                ).then(response => {
                    console.log(response.data);
                    alert('Your information is updated successfully ^_^');
                }).catch(e => {
                    if (e.response.status === 401) clearupToken();
                    else alert(e);
                })
    }

    return (
        <div className='profile'>
            <ProfileCard userInfo = {userInfo} />
            <InfoForm userInfo = {userInfo} handleUser={handleUser} updateUser={updateUser} />
        </div>
    )
}
