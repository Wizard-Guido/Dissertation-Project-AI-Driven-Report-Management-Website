/* 
This file is for directing from Management to Edit Component, it's for the question-answers list to be displayed 
*/

import store from "../store";
import {ADDQA} from "../constant";

export const addQA = qAList => ({type:ADDQA, data:qAList});