import React, { Component } from 'react';
import './index.css'

export default class Question extends Component {

    render() {
        const {content,id} = this.props;
        return (
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label question">{content}</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.props.handleText} name={id}></textarea>
            </div>
        )
    }
}