
import moment from 'moment';
/* este helper se encargara de mappear las fechas de los evento, cuando las fechas vengan en formato string las transformara
   a fechas de tipo date
*/

export const prepareEvents = (eventos = []) => {

    return eventos.map( event => {
        return  {
            ...event,
            start: moment( event.start ).toDate(), // moment toma la fecha de tipo string  y genera una nueva con el .toDate()
            end: moment( event.end ).toDate()
        }
    })

}