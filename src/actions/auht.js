import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fetchSinToken, fetchConToken } from '../helpers/fetch' 
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
    /* Retorno una funcion porq esta accion es asincrona, recordar que thunk me ofrece un conjunto de weas como argumentos en el callback */
    return async( dispatch ) => {

        const resp =  await fetchSinToken('auth', { email, password }, 'POST');
        const body =  await resp.json();
    
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const startRegister = ( email, password, name) => {

    return async( dispatch ) => {
        
        const resp =  await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body =  await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {
        
        const resp =  await fetchConToken('auth/renew');
        const body =  await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = ()=>({ type: types.authCheckingFinish });

export const startLogout = () => {
    return async( dispatch ) => {
        await localStorage.clear(); // decisidí usar await porq la gestion del localstorage es considerada asincrona
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({
    type: types.authLogout
})