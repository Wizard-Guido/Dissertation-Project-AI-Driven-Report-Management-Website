import React, { Component } from 'react';
import Question from '../Question';
import axios from 'axios';
import Swal from 'sweetalert2';
import './index.css';

export default class Questionnaire extends Component {
    state = {
        Q1: [
            {id:'q11', content: 'If this RAT is related to a specific publication, please provide a reference to that publication.', answer: ''},
            {id:'q12', content: 'What is the purpose of the model? ', answer: ''},
            {id:'q13', content: 'What domain does the model research?', answer: ''},
            {id:'q14', content: 'What (research) question(s) is the model addressing?', answer: ''},
            {id:'q15', content: 'What is the MAIN driver for your initial model development step?', answer: ''},
            {id:'q16', content: 'Explain why this MAIN driver was chosen?', answer: ''},
            {id:'q17', content: 'What is the target system that this model reproduces?', answer: ''},
            {id:'q18', content: 'Explain why this target system and these boundaries were chosen.', answer: ''},
            {id:'q19', content: 'Any additional comments?', answer: ''},
        ],
        modelName: '',
        public: false,
    }


    upLoadInfo = (event) => {
        // const {Q1} = this.state;
        console.log(JSON.stringify(this.state))
        const packageData = {token: sessionStorage.getItem('token'), ...this.state}
        const {userId, clearupToken} = this.props;
        event.preventDefault();
        axios.post(
            // URL
            `/api1/models/${userId}`,
            // Data
            packageData,
            {headers:{"Authorization": "Bearer " + sessionStorage.getItem('token')}}
        ).then(response => {
            alert('Data is uploaded successfully! ^_^');
        }).catch( err => {
            if (err.response.status === 401) clearupToken();
            else Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Cool',
                confirmButtonColor: '#74b9ff'
              });
        }
        )
    }

    handleText = (event) => {
        const {Q1} = this.state;
        const answer = event.target.value;
        const id = event.target.name;
        for (let i = 0; i <Q1.length; i++) {
            if(Q1[i].id === id) {Q1[i].answer = answer;}
        }
        this.setState({Q1});
    };

    handleName = (event) => {
        const modelName = event.target.value;
        this.setState({modelName});
    };

    // set if the document is public
    ifPublic = () => {
        const ifPub = this.state.public ? false : true; 
        this.setState({public: ifPub});
    };

    render() {
        const {Q1} = this.state;
        return (
            <form className="row g-3" onSubmit={this.upLoadInfo}>
                {
                    Q1.map((questionObj) => {
                        return (<Question key={questionObj.id} handleText={this.handleText} {...questionObj} />)
                    })
                }

            <div className="input-group">
                <span className="input-group-text">Model name</span>
                <input type="text" className="form-control modelname" onChange={this.handleName} />
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={this.state.public} onChange={this.ifPublic} />
                <label class="form-check-label" for="flexSwitchCheckChecked">Public</label>
            </div>

            <div className="col-12">
                <button className="btn btn-primary" type="submit">Submit form</button>
            </div>
            </form>
        )
    }
}