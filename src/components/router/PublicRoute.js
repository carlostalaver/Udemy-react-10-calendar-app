import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types'; /* impt más tab para importar */

export const PublicRoute = ({ isAutenticated,  component: MiComponent, ...rest }) => { //...rest almacenaré el resto de parametos, ejemplo el exact, el path etc
    return (
        <Route
            {...rest}
            component= { (props) => (
                ( isAutenticated )
                    ? (<Redirect to="/" />) /* si  no esta autenticado redirijo al dashboard*/
                    : (<MiComponent {...props} />) /* si esta autenticado retornara el componente al que deseo ir */
            )}
        />
    )
}

PublicRoute.propTypes = { // propTypes con p minuzcula 
   isAutenticated: PropTypes.bool.isRequired, // PropTypes con p mayuscula
   component: PropTypes.func.isRequired  // component es una funcion por eso se usa func
}
