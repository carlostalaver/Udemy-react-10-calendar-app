import React from 'react'

export const CalendarEvent = ( props ) => {

    // console.log('CalendarEvent ', props);

    const {title, user } = props.event;

    return (
        <div>
            <span> { title } </span>
            <strong> { user.name }</strong>
        </div>
    )
}
