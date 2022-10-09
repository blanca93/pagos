import './PersonaForm.css';
import { Persona } from '../../types';

interface Props {
    personas: Array<Persona>
}

interface PersonaState {
    personas: Array<Persona>;
    newPersonas: Array<Persona>;
}

export default function PersonaForm ({personas}: Props) {

  return (
    <div className="table-container" role="table" aria-label="Personas">
        <div className="flex-table header" role="rowgroup">
        <div className="flex-row" role="columnheader">Id</div>
        <div className="flex-row" role="columnheader">Persona</div>
        </div>
        {
        personas?.map(persona => {
            return (
            <div className="flex-table row" role="rowgroup">
                <div className="flex-row" role="cell">{persona.id}</div>
                <div className="flex-row" role="cell">{persona.name}</div>
            </div>
            )
        }) 
        }                       
    </div>   
  );
}
