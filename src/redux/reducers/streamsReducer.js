import {UPDATE_STREAM, FETCH_STREAM, FETCH_STREAMS, CREATE_STREAM, DELETE_STREAM} from '../../resources/types';

import _ from 'lodash';


export default (state={}, action) => {
    switch(action.type){
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')} // This will create new object from array and create the key of 'id' property
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case UPDATE_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            return _.omit(state,action.payload); // _.omit will create new object with the values inside 'sate' without the value present in 'action.payload'
        default:
            return {...state}
    }
};