import React, { useRef } from 'react'
import axios from 'axios'
import './index.css'
import { Link } from 'react-router-dom'
import ratLogo from '../../img/rat.jpg'


export default function SignUp() {
    let username = useRef(null);
    let email = useRef(null);
    let password = useRef(null);
    let last_name = useRef(null);
    let first_name = useRef(null);
    let gender = useRef(null);

    const checkSignup = (event) => {
        event.preventDefault();
        username = username.current.value;
        email = email.current.value;
        password = password.current.value;
        last_name = last_name.current.value;
        first_name = first_name.current.value;
        gender = gender.current.value;
        console.log({username,email,password,last_name,first_name,gender})
        axios.post(
            // URL
            '/api1/users',
            // Data
            {username,email,password,last_name,first_name,gender}
        ).then(response => {
            if (response.status === 401) {alert("This account is not authorized, please check your username and password again!")}
            else {
                alert('New Account is registered successfully!');
                window.location.href = "/";
            }
        }).catch( err => {
            alert('The error: '+err);
            window.location.href = "/register";
        }
        )
    }

    return (
        <div>
        <div className='logoBox'><img src={ratLogo} alt="Rigour and Transparency Reporting Standard" className="rat" /></div>
        <div className="signupbox">
                <div><h1>Sign up to RAT</h1></div>
                <div><p>RAT-RS: A Reporting Standard for Improving the Documentation of Data Use in Agent-Based Modelling</p></div>
                <div className="loginform">
                    <form action="#" onSubmit={checkSignup}>
                        <div className="form-unit">

                            <input ref={username} type="text" name="username" id="username" placeholder="Username" required />
                        </div>
                        <div className="form-unit">

                            <input ref={email} type="text" name="email" id="email" placeholder="Email" required />
                        </div>
                        <div className="form-unit">

                            <input ref={password} type="password" name="password" id="password" placeholder="Password" required />
                        </div>
                        <div className="form-unit">
                            <input ref={last_name} type="text" name="surname" id="surname" placeholder="Surname" required />
                        </div>
                        <div className="form-unit">
                            <input ref={first_name} type="text" name="firstname" id="firstname" placeholder="Firstname" required />
                        </div>
                        <div className="form-unit">
                            <select ref={gender} type="text" className="form-control" id="exampleInputGender">
                                <option selected="selected" disabled="disabled" style={{display: 'none'}}></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        
                        <input type="submit" className="submitButton" value="Sign up" />
                        <Link className="footer" to="/">SIGN IN</Link>
                    </form>
                </div>
            </div>
            </div>
    )
}