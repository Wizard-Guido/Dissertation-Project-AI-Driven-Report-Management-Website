import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { useLocation } from 'react-router'

import { Link } from 'react-router-dom'

import slog from '../../../img/file-check.svg'

import './index.css'


export default function Management(props) {

    // Individual State to be maintained
    const [model_names, setNames] = useState([])

    // Update the model name list every time the url is directed to itself here
    const location = useLocation;

    useEffect(() => {
        const {userId, clearupToken} = props;
        axios.get(`/api1/models/${userId}`, {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}})
                .then(res=>{
                    console.log('res',res.data)
                    if (!res.data.length) return;
                    // model_names.data is an array, which is like [{model_id: ??, model_name: ??}, ...]
                    console.log(res.data);
                    setNames(res.data);
                })
                .catch(e => {
                    if (e.response.status === 401) clearupToken();
                    else alert(e);
                });
                }, [location])
    
    console.log(model_names)
        
    // Define the function to delete the model and its question-answers
    const deleteModel = async(modelId) => {
        const {userId} = props;
        const token = sessionStorage.getItem('token');
        console.log('userId',userId)
        console.log('modelId',modelId)
        const response = await axios.delete(`/api1/models/${userId}/${modelId}`, {headers:{"Authorization": "Bearer " + token}});
        if (response.status === 200) {
            alert('The data is cleaned successfully ^_^');
            setNames(model_names.filter(model_name => model_name.id !== modelId*1));
        } else {alert('The data wasn\'t deleted. Please do it again!');}

    }
    
    // console.log(names);
    console.log(model_names.length)
    if (!model_names.length) return <div className="mpcenter topword">You have not uploaded any RATs yet</div>

    return (
            <div className="managepage">
                <div className="mpleft"></div>
                <div className="mpcenter">
                    <div className="topword recommend">
                        <p>Your articles</p><Link type="button" className="btn btn-primary" to="/recommendation">Feed</Link>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            model_names.map((obj) => {
                                return (
                                    <li key={obj.model_id} className="list-group-item">
                                        <p><img src={slog} alt="small-logo" />{obj.model_name}</p>
                                        <Link type="button" className="btn btn-primary" to={`/management/edit/${obj.id}`}>Edit</Link>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteModel(obj.id)}>Delete</button>
                                    </li>
                                )
                            })
                        }
                        <li className="list-group-item">

                        </li>
                    </ul>
                </div>
                <div className="mpright"></div>
            </div>
    )
}

