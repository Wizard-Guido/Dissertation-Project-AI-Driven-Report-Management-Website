import React from 'react'
import './index.css'


export default function InfoForm(props) {

    const {username, last_name, first_name, gender, email, password} = props.userInfo;
    const {handleUser, updateUser} = props;

    return (
        <div className='inform'>
            <form className="info form" onSubmit={updateUser}>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername" className="form-label">Username </label>
                    <input type="text" className="form-control" id="exampleInputUsername" defaultValue={username} onChange={handleUser('username')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputSurName" className="form-label">Surname </label>
                    <input type="text" className="form-control" id="exampleInputSurName" defaultValue={last_name} onChange={handleUser('surname')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputFirstname" className="form-label">Firstname</label>
                    <input type="text" className="form-control" id="exampleInputFirstname" defaultValue={first_name} onChange={handleUser('firstname')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputGender" className="form-label">Gender</label>
                    <select type="text" className="form-control" id="exampleInputGender" defaultValue={gender} onChange={handleUser('gender')}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Perfer not to say</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={email} onChange={handleUser('email')} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleUser('password')} defaultValue={password} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

