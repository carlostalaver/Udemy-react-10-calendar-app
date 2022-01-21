import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auht';

export const Navbar = () => {

    const { name }  = useSelector(state =>  state.auth );
    const dispatch = useDispatch();

    const handleLogut = () => {
        dispatch(  startLogout() );
    }
    return (
        <div className="navbar navbar-dark bg-dark mb-4">

            <span className ="navbar-brand">
                { name }
            </span>

            <button type="button"
                className="btn btn-outline-danger"
                onClick = { handleLogut }
                >
                <i className="fa fa-sign-out-alt"></i>
                <span> Salir </span>
            </button>
            
        </div>
    )
}
