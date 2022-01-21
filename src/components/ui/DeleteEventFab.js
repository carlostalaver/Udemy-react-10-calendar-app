import React from 'react'
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDeleted = (e) => {
        e.preventDefault();
        dispatch( eventDeleted() );
    }
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDeleted }

        >
            <i className="fas fa-trash">
                
            </i>
            <span>  Borrar event</span>
        </button>
    )
}
