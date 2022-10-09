import React, { SetStateAction, useState } from 'react';
import { Pago } from '../../types';
import './PagoForm.css';

interface PagoFormState {
    inputValues: Pago
}

interface PagoFormProps {
    onNewPago: (newPago: Pago) => void
}

const PagoForm = ({onNewPago}: PagoFormProps) => {
    const [inputValues, setInputValues] = useState<PagoFormState['inputValues']>({
        id: 0,
        personaId: 0,
        personaName: '',
        importe: 0,
        fecha: new Date(Date.now()),
        descripcion: ''
    });
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onNewPago(inputValues);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <ul className="flex-outer">
                // TODO: meter aquí un dropdown para elegir persona
                    <li>
                        <label htmlFor="personaName">Persona:</label>
                        <input onChange={handleChange} value={inputValues.personaName} type='text' name='personaName' placeholder='Ana'/>
                    </li>

                    <li>
                        <label htmlFor="importe">Importe:</label>
                        <input onChange={handleChange} value={inputValues.importe} type='number' name='importe' placeholder='100.52'/>
                    </li>

                    <li>
                        <label htmlFor="fecha">Fecha y hora:</label>
                        <input onChange={handleChange} value={inputValues.fecha?.toDateString()} type="datetime-local" name='fecha'/>
                    </li>

                    <li>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea onChange={handleChange} value={inputValues.descripcion} name='descripcion' placeholder='Entradas'/>
                    </li>
                    <li>
                        <button type='button'>Limpiar</button>
                    </li>
                    <li>
                        <button type='submit'>Guardar</button>
                    </li>                    
                </ul>
            </form>
        </div>
    )
}

export default PagoForm;