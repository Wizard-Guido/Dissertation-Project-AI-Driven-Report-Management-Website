import React from 'react'
// import prof from '../../img/prof.jpeg'
import './index.css'


export default function ProfileCard(props) {

    const {last_name, first_name} = props.userInfo;


    return (
        <div className='profilecard'>
            <div className="card profile" style={{width: "18rem"}}>
                {/* <img src={prof} className="card-img-top prof" alt="..." /> */}
                <div className="card-body">
                    <h5 data-testid="userName" className="card-title">{first_name} {last_name}</h5>
                    <p className="card-text">Super Admin<br/>Total RATs: 100</p>
                    <div className="positionjob">Professor</div>
                </div>
            </div>
        </div>
    )
}
