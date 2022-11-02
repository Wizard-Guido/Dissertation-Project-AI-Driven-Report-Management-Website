import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
import Swal from 'sweetalert2';
import ratLogo from '../../img/rat.jpg'
import { Link } from 'react-router-dom';

export default class Login extends Component {

    username = React.createRef();
    password = React.createRef();

    checkSignin = (event) => {
        const {setupToken} = this.props;
        event.preventDefault();
        const username = this.username.current.value;
        const password = this.password.current.value;

        axios.post(
            // URL
            '/api1/login',
            // Data
            {username, password}
        ).then(response => { // get the response data from backend
            const token = response.data.access;
            console.log(token)
            setupToken(token);
            console.log('---')
        }).catch(err => {
            // alert(err)
            Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#0fbcf9'
            })
        }
        )

    }

    render() {
        return (
            <div>
            <div className='logoBox'><img src={ratLogo} alt="Rigour and Transparency Reporting Standard" className="rat" /></div>
            <div className="loginbox">
                <div><h1>Log in to RAT</h1></div>
                <div><p>RAT-RS: A Reporting Standard for Improving the Documentation of Data Use in Agent-Based Modelling</p></div>
                <div className="loginform">
                    <form action="#" onSubmit={this.checkSignin}>
                        <div className="form-unit">

                            <input ref={this.username} type="text" name="username" id="username" placeholder="Username" required />
                        </div>
                        <div className="form-unit">

                            <input ref={this.password} type="password" name="password" id="password" placeholder="Password" required />
                        </div>
                        
                        <input type="submit" className="submitButton" value="Sign in" />
                        <Link className="footer" to="/register">SIGN UP</Link>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}