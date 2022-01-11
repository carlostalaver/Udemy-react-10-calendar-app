import moment from "moment";
import { types } from "../types/types";



const initialState = {
    events: [{
        title: 'Cumpleaños del jefe',
        start: moment().toDate(), // es el equivalente en moment de new date() en javascript
        end: moment().add(2, 'hours').toDate(), // le digo que la fecha de finalizacion será 2 horas despues del inicio
        bgcolor: '#fafafa',
        notes: 'Comprar pastel',
        user: {
            _id: '123',
            name: 'Carlitos'
        }
    }],
    activeEvent: null
};



export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
    
        default:
            return state;
    }
}