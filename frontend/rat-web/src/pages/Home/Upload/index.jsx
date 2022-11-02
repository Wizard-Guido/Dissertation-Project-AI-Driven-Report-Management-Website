import React, { Component } from 'react'
import Questionnaire from '../../../components/Questionnaire';
import './index.css'

export default class Upload extends Component {
    
    render() {
        const {userId, clearupToken} = this.props;
        return (
            <div className="qBox">
                <Questionnaire userId={userId} clearupToken={clearupToken} />
            </div>
        )
    }
}
