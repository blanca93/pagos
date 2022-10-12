import React, { useEffect, useState } from 'react';
import { Pago, Persona } from '../../types';
import PersonaForm from '../PersonaForm/PersonaForm';
import './PagoForm.css';

const INITIAL_STATE_PERSONAS = [
    {
        id: 0,
        name: 'Francisco Buyo'
    },
    {
        id: 1,
        name: 'Alfonso Pérez'
    },
    {
        id: 2,
        name: 'Raúl González'
    },
    {
        id: 3,
        name: 'Jose María Gutiérrez'
    }

];

interface PersonaState {
    personas: Array<Persona>;
    personaId: number;
}

interface PagoFormState {
    inputValues: Pago
}

interface PagoFormProps {
    onNewPago: (newPago: Pago) => void
}

const PagoForm = ({onNewPago}: PagoFormProps) => {
    const [personas, setPersonas] = useState<PersonaState['personas']>([]);
    const [personaId, setPersonaId] = useState<PersonaState['personaId']>(4);
    const [inputValues, setInputValues] = useState<PagoFormState['inputValues']>({
        id: 0,
        personaId: 0,
        personaName: '',
        importe: 0,
        fecha: '',
        descripcion: ''
    });

    useEffect(() => {
        setPersonas(INITIAL_STATE_PERSONAS);
    }, [])

    useEffect(() => {
        localStorage.setItem('personas', JSON.stringify(personas));
    }, [personas]);

    const handleNewPersona = (newPersona: Persona): void => {
        newPersona.id = personaId;
        setPersonaId(personaId => personaId + 1)
        setPersonas(personas => [...personas, newPersona])
    }
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValues.personaName === "" || inputValues.fecha === '' || inputValues.importe === 0) {
            alert("Los campos persona, fecha e importe son obligatorios");
        } else {
            onNewPago(inputValues);
            alert("Los datos se han guardado correctamente");
        }         
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="container">
            <PersonaForm onNewPersona={handleNewPersona}/>
            <form onSubmit={handleSubmit}>
                <ul className="flex-outer">
                    <li>
                        <label htmlFor="personaName">Persona:</label>
                        <select data-cy="newpagopersona" onChange={handleChange} value={inputValues.personaName} name='personaName'>
                        {
                            personas.map(el => <option value={el.name} key={el.id}> {el.name} </option>)
                        }
                        </select>
                    </li>

                    <li>
                        <label htmlFor="importe">Importe:</label>
                        <input data-cy="newpagoimporte" onChange={handleChange} value={inputValues.importe} type='number' name='importe' placeholder='100.52'/>
                    </li>

                    <li>
                        <label htmlFor="fecha">Fecha y hora:</label>
                        <input data-cy="newpagofecha" onChange={handleChange} value={inputValues.fecha} type="datetime-local" name='fecha'/>
                    </li>

                    <li>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea onChange={handleChange} value={inputValues.descripcion} name='descripcion' placeholder='Entradas'/>
                    </li>
                    <li>
                        <button data-cy="newpagobutton" type='submit'>Guardar pago</button>
                    </li>                    
                </ul>
            </form>
        </div>
    )
}

export default PagoForm;