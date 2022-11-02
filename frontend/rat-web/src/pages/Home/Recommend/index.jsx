import React, { useState, useEffect } from 'react'

import { useLocation } from 'react-router'

import axios from 'axios'

import{ nanoid } from 'nanoid'

import slog from '../../../img/file-check.svg'

import './index.css'



export default function Recommendation(props) {

    const [allPaper, setPaper] = useState([]);

    const location = useLocation;

    useEffect(() => {
        const {clearupToken} = props;
        axios.get('/api1/recommendations', {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}})
                .then(res=>{
                    console.log(res.data);

                    setPaper(res.data);
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
                        allPaper.map((list) => {
                            return (
                                <li key={nanoid()} className="list-group-item">
                                    <div className="recpaper"><img src={slog} alt="small-logo" /><a href={list[1]} target="_blank">{list[0]}</a></div>
                                </li>
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
