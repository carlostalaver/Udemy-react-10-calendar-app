import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // importo la configuracion para trabajar con fechas en español (esto es, le digo a moment que trabajaré en español)
import 'react-big-calendar/lib/css/react-big-calendar.css'; // importo los estilos de big calendar( los proporsiona la propia do cumentacion ->http://jquense.github.io/react-big-calendar/examples/index.html)
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { messages } from '../../helpers/calendar-messages-es';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearNoteEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment); // se inicializa el localizer
moment.locale('es'); // establezco el idioma de preferencia

/* Creo una pequeña lista de eventos para pasarsela al componente  Calendar*/
const events = [{
    title:'Cumpleaños del jefe',
    start: moment().toDate(), // es el equivalente en moment de new date() en javascript
    end: moment().add( 2, 'hours' ).toDate(), // le digo que la fecha de finalizacion será 2 horas despues del inicio
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user: {
        _id: '123',
        name: 'Carlitos'
    }
}]

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatchCalendar = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid } = useSelector(state => state.auth);

    useEffect(()=> {
        dispatchCalendar( eventStartLoading() );
    }, [dispatchCalendar]);


    const onDoubleClick = (e) => {
        console.log(e);
        dispatchCalendar( uiOpenModal() );
    }
    
    const onSelectEvent = (e) => {
        // console.log("evento en el calendario")
        dispatchCalendar( eventSetActive(e) );
    }

    /* este evento se disparará cuando de click en los botones Mes/Semana/Día/Agenda */
    const onViewChange = (e) => {
        console.log('e -> ', e);
        setLastView(e);
        localStorage.setItem('lastView', e)
    }



    const evenStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);


        const style = {
            backgroundColor: ( uid ===event.user._id ) ? '#367CF7' : '#465660', // si el evento es propio aparecerá en azul, si es ajeno en gris
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',    
        }

        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        // console.log(e);
        dispatchCalendar( eventClearNoteEvent() )

    }



    return (
        <div  className="calendar-screen"> {/* esto es necesario para poder ver el calendario cuando pincho en months */}
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages= { messages } // para configurar el calendario en español
                eventPropGetter= { evenStyleGetter } // eventPropGetter se llama cuando se renderiza el componente Calendar
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent = { onSelectEvent } // se dispara cada que selecciono un evento en el calendario
                onView = { onViewChange } //  este evento se disparará cuando de click en los botones Mes/Semana/Día/Agenda
                view = { lastView } // para conservar la vista actual si llegase a recargar la app, es decir, si estoy en la vista de agenda y recargo seguiré viendo la vista de agenda
                onSelectSlot = { onSelectSlot } // es dispara cuando hago click en cualquiera de las celdas de calendario, para que esta funcion se llame  la propiedad selectable = { true } debe estar en true
                selectable = { true } 
                components = { {
                        event: CalendarEvent // ojo q no se le pasa el component con < /> como -> <CalendarEvent />, solo se la pasa LA REFERENCIA  al componenete, este ultimo recibe como pros un obj que contiene mucha info, ver el console.log en en la deficion de CalendarEvent
                } } 
            />


            <AddNewFab />
            {
                activeEvent &&  <DeleteEventFab />
            }
           
            <CalendarModal />
        </div>
    )
}
