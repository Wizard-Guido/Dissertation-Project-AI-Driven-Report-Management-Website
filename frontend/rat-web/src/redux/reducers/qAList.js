/* 
This file is for directing from Management to Edit Component, it's for the question-answers list to be displayed 
*/

import { ADDQA } from "../constant";

const initqAList = [];
export default function tokenReducer(preState=initqAList, action) {
    const {type, data} = action;
    switch (type) {
        case ADDQA:
            return [data, ...preState];
        
        default:
            return preState;
    }
}