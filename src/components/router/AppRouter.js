import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { startChecking } from '../../actions/auht';
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid  }  = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch( startChecking() );
        console.log("Disparando el estar startChecking");
    },[dispatch])

    if( checking ){
        return (<h5> Espere...!</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute
                        exact path="/login"
                        component = { LoginScreen }
                        isAutenticated = { !!uid }
                    />
                    <PrivateRoute
                        exact path="/"
                        component = { CalendarScreen }
                        isAutenticated = { !!uid }
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
