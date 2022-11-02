import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useLocation } from 'react-router'

import axios from 'axios'

import slog from '../../../img/file-check.svg'
import slog1 from '../../../img/writer.png'

import './index.css'


export default function DashBoard(props) {

    const [allPaper, setPaper] = useState([]);

    const location = useLocation;

    useEffect(() => {
        const {clearupToken} = props;
        axios.get('/api1/models', {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}})
                .then(allPublic=>{
                    console.log(allPublic.data);

                    setPaper(allPublic.data);
                    // console.log(allPaper);
                })
                .catch(e => {
                    if (e.response.status === 401) {
                        clearupToken();
                    } else {
                        alert('Something goes wrong, please try it later');
                    }
                });
                }, [location])

    return (
        <div className="managepage">
            <div className="mpleft"></div>
            <div className="mpcenter">
                <ul className="list-group list-group-flush">
                    {
                        allPaper.map((obj) => {
                            return (
                                <Link key={obj.id} className="list-group-item" to={`/view/${obj.id}`}>
                                    {/* <Link  to={`/management/edit/`}> */}
                                    <p><img src={slog} alt="small-logo" />  {obj.model_name}</p>
                                    {/* <Link type="button" className="btn btn-warning" to={`/management/edit/`}>Edit</Link> */}
                                    {/* <button type="button" className="btn btn-danger" >Delete</button> */}
                                    <p><img src={slog1} alt="small-logo" />  User {obj.user_obj}</p>
                                    {/* </Link> */}
                                </Link>
                            )
                        })
                    }

                    <li key={2} className="list-group-item"></li>
                </ul>
            </div>
            <div className="mpright"></div>
        </div>
    )
}
