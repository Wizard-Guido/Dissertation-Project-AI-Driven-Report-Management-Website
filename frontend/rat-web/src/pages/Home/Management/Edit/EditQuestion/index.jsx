import React from 'react'

export default function EditQuestion(props) {
    const {id, question_name, answer, handleA} = props;

    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label question">{question_name}</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name={id} onChange={handleA} defaultValue={answer} />
        </div>
    )
}
