import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearNoteEvent } from '../../actions/events';
/* este componente se creó siguiendo la documentacion de react-modal -> https://www.npmjs.com/package/react-modal#examples */
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root'); //#root es el  <div id="root"></div>  que esta en index.html
const now = moment().minute(0).second(0).add(1, 'hours'); // para q me retorne una hora MAS a la actual, es decir, si son las 2:25:21 retornará 3:00:00, 
const nowPlusOne = now.clone().add(1, 'hours'); // se debe clonar, sino modificaré el objeto now

const initEvent = {
    title:'',
    notes:'',
    start: now.toDate(),
    end: nowPlusOne.toDate()
}

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlusOne.toDate() );
    const [titleValid, setTitleValid] = useState(true);
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const dispatchCalendarModal = useDispatch();

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent);
        }
    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value //uso [] porque quiero computar el nombre de la propiedad
        });
    }

    const closeModal = (e) => {
        dispatchCalendarModal( uiCloseModal() );
        dispatchCalendarModal( eventClearNoteEvent() );
        setFormValues( initEvent );
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        
        const fechaInicio = moment( start ); //las convierto de un obj fecha de javascript a un obj fecha de tipo moment para poder trabajar mas facilmente
        const fechaFin = moment( end );
        
        if( fechaInicio.isSameOrAfter( fechaFin ) ) {
             Swal.fire('La fecha fin debe de ser mayor a la fecha de inicio', 'error');
             return;
        }

        if(title.trim() < 2){
            setTitleValid(false);
            return;
        }

        // TODO: save in BBDD
        dispatchCalendarModal(eventAddNew(
            {
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: 12,
                    name: 'Carlos'
                }
            }
        ))

        setTitleValid(true);
        closeModal();
    }

    return (
        /* <Modal> <Modal/> es un componente de orden superior */
        <Modal 
            isOpen = { modalOpen } // prob booleana q se encarga de ocultar/mostrar el modal
            // onAfterOpen={afterOpenModal}
            onRequestClose = { closeModal }
            closeTimeMS = { 200 } // para que se cierre el modal en 200 milesimas de segundo 
            style = { customStyles }
            // contentLabel="Example Modal"
            className = "modal"
            overlayClassName = "modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container"
                onSubmit ={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    {/* el COMPONENTE DateTimePicker se encuantra en  DateTimePicker*/}
                    <DateTimePicker 
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart } // para asegurarme q la fecha de finalizacion no se menor a la inicio
                        className="form-control"
                       // format="y-MM-dd h:mm:ss a" // ojo que aqui modifique el formato para probar opciones de visualizacion
                       // amPmAriaLabel="Select AM/PM"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        value = { title }
                        onChange = { handleInputChange }
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value = { notes }
                        onChange = { handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>

    )
}
