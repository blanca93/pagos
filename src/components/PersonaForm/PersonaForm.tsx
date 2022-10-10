import './PersonaForm.css';
import { Persona } from '../../types';
import { useState } from 'react';

interface Props {
    onNewPersona: (newPersona: Persona) => void
}

interface PersonaState {
    inputValues: Persona
}

export default function PersonaForm ({onNewPersona}: Props) {

    const [inputValues, setInputValues] = useState<PersonaState['inputValues']>({
        id: 0,
        name: ''
    });
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onNewPersona(inputValues);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <ul className="flex-outer">
                    <li>
                        <label htmlFor="name">Persona:</label>
                        <input onChange={handleChange} value={inputValues.name} type='text' name='name' placeholder='Ana'/>
                    </li>
                    <li>
                        <button type='submit'>Guardar</button>
                    </li>                    
                </ul>
            </form>
        </div>
    )
}
