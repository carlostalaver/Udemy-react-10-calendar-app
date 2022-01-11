import React from 'react'
import { Provider }  from 'react-redux';
import { AppRouter } from './components/router/AppRouter'
import { store } from './store/store';

const CalendarApp = () => {
    return (
        <Provider store = { store } >
            <AppRouter />
        </Provider>
    )
}

export default CalendarApp


/* Intalaciones de este proyecto:

    npm i react-router-dom
    https://cdnjs.com/libraries/font-awesome (CDN: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />)
    npm i react-big-calendar: https://www.npmjs.com/package/react-big-calendar (para trabajar con calendarios)
    npm i moment
    npm i react-modal: https://www.npmjs.com/package/react-modal
    npm i react-datetime-picker: https://www.npmjs.com/package/react-datetime-picker
    npm i sweetalert2
    npm install react-redux: https://react-redux.js.org/introduction/getting-started
    npm i redux-thunk: https://www.npmjs.com/package/redux-thunk
*/