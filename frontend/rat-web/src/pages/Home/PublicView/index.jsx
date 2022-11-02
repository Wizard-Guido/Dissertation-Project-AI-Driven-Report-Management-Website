import React, { useState, useEffect } from 'react'

import { useLocation, useParams } from 'react-router';

import axios from 'axios'

import ViewQuestion from './ViewQuestion'

import './index.css'

export default function PublicView(props) {

    const [QA, setQA] = useState({});

    const location = useLocation;

    const modelIdObj = useParams('id');

    const modelId = modelIdObj.id;


    useEffect(()=> {
        const {userId, clearupToken} = props;
        axios.get(`/api1/models/${userId}/${modelId*1}`,
                {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}})
            .then(response => {

                console.log('response', response.data);
                setQA(response.data);
            }).catch(err => {
                if (err.response.status === 401) clearupToken();
                else alert(err);
            })
        }, [location])

    
    return (
        <div className='qBox'>
                  
                {QA.questions && QA.model && QA.questions.length ? (
                    <div className="row g-3">
                        {QA.questions.map((qAObj) => <ViewQuestion key={qAObj.id} {...qAObj}/>)}
                        <div className="input-group">
                            <span className="input-group-text">Model Name</span>
                            <input type="text" className="form-control modelname" value={QA.model.model_name} />
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={QA.model.public} />
                            <label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
                        </div>
                    </div>
                    ) : (
                        <div className="mpcenter topword">You haven't uploaded any details of the model yet</div>
                    )
                }

        </div>
    )
}
