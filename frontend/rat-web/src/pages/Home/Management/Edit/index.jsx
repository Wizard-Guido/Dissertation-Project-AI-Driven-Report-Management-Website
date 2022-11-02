import React, {useState, useEffect} from 'react'

import { useLocation, useParams } from 'react-router';

import axios from 'axios'

import EditQuestion from './EditQuestion';

import './index.css'


export default function Edit(props) {

    // Individual State to be maintained
    const [qAList, setQA] = useState({});
    const [isShow, setShow] = useState(false);

    // Update the question answer list every time the url is directed to itself here
    const location = useLocation;

    const modelIdObj = useParams('id');

    const modelId = modelIdObj.id;

    const {userId, clearupToken} = props;

    console.log('ModelIdObject')
    console.log(modelIdObj, modelId);

    useEffect(()=> {
        axios.get(`/api1/models/${userId}/${modelId*1}`, {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}})
        .then(response => {
            console.log('response', response.data);
            setQA(response.data);
            setShow(response.data.model.public);
        }).catch(err => {
            if (err.response.status === 401) clearupToken();
            else alert(err);
        })
    }, [location,userId,modelId])

    console.log('qAList', qAList);


    // Handle changed information and upload them to the backend
    const handleA = (event) => {
        const newAnswer = event.target.value,
            id = event.target.name*1;
        for (let qaObj of qAList.questions) {
            if (qaObj.id === id) {qaObj.answer=newAnswer;}
        }
        setQA({...qAList});
    };


    const handleModelName = (event) => {
        const newName = event.target.value;

        qAList.model.model_name = newName;
        setQA({...qAList});
    };

    const updateForm  = (event) => {
        const newQA = {'questions': qAList['questions'], 'model': {'model_name': qAList['model']['model_name'], 'public': isShow}}
        axios.patch(`/api1/models/${userId}/${modelId*1}`,
                    newQA,
                    {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}}
            ).then(response => {
                console.log(response.data);
                alert('The data is changed successfully ^_^');
            }).catch(err=>{
                if (err.response.status === 401) clearupToken();
                else alert(err);
            })

        event.preventDefault();
    };

    // set if the document is public
    const ifPublic = () => {
        const ifPub = isShow ? false : true;
        setShow(ifPub);
        console.log('isShow', isShow);
    };
console.log('refresh', qAList)
    return (
        <div className='qBox'>
            <form className="row g-3" onSubmit={updateForm}>
            {qAList.questions ?
                    (<>
                        {qAList.questions.map((qAObj) => {
                        return (<EditQuestion key={qAObj.id} handleA={handleA} {...qAObj}/>)
                    })}
                <div className="input-group">
                    <span className="input-group-text">Model Name</span>
                    <input type="text" className="form-control modelname" defaultValue={qAList.model.model_name} onChange={handleModelName} />
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked={qAList.model.public} onChange={ifPublic} />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
                </>
                )
                :
                (<div className="mpcenter topword">You haven't uploaded any details of the model yet</div>)
            }
            </form>
        </div>
    )

}