import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/preperEvents";
import { types } from "../types/types";
import Swal from 'sweetalert2';


export const eventStartAddNew = (eventoFormulario) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', eventoFormulario, 'POST');
            const body = await resp.json();

            if(body.ok) {
                eventoFormulario.id = body.evento.id;
                eventoFormulario.user = {
                    _id : uid,
                    name: name

                };
                 dispatch( eventAddNew( eventoFormulario ) );
            }
     
        } catch (error) {
            console.log( 'Error al intentar guardar el evento', error );
            
        }
    }
}

export const eventStartLoading = () => {
    return async( dispatch) => {
        
        try {
            const resp = await fetchConToken('events');
            const body =  await resp.json();
            const eventos = prepareEvents(body.eventos); // transformo las fecha de string a Date

            dispatch( eventLoaded( eventos ) );

        } catch (error) {
            console.log("Error al intentar recuperar los eventos..! ", error);
        }
        
    }
}

const eventLoaded = ( eventos ) => ({
     type: types.eventLoaded,
     payload: eventos
})

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


export const eventClearNoteEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = ( evento ) => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken(`events/${ evento.id }`, evento, 'PUT');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventUpdated( evento ));
            } else {
                Swal.fire('Error', body.msg, 'error'); 
            }
            
        } catch (error) {
            console.log("Error al intentar actualizar el evento...!", error);
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = (evento) => {
    return async(dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
         try {

            const resp = await fetchConToken(`events/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch( eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error'); 
            }
            
        } catch (error) {
            console.log("Error al intentar Eliminar el evento...!", error);
        }
    }
}

 const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventLogout = () => ({
    type: types.eventLogout
})