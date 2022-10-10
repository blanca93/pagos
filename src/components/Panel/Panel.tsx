import { Pago } from './../../types';
import './Panel.css';

interface Props {
    pagos: Array<Pago>
}

export default function Panel ({pagos}: Props) {

  return (
    <div className="table-container" role="table" aria-label="Personas">
        <div className="flex-table header" role="rowgroup">
        <div className="flex-row" role="columnheader">PERSONA</div>
        <div className="flex-row" role="columnheader">IMPORTE</div>
        <div className="flex-row" role="columnheader">FECHA</div>
        <div className="flex-row" role="columnheader">DESCRIPCIÓN</div>
        </div>
        {
        pagos?.map(pago => {
            return (
            <div className="flex-table row" role="rowgroup">
                <div className="flex-row" role="cell">{pago.personaName}</div>
                <div className="flex-row" role="cell">{pago.importe}</div>
                <div className="flex-row" role="cell">{pago.fecha}</div>
                <div className="flex-row" role="cell">{pago.descripcion}</div>
            </div>
            )
        }) 
        }                       
    </div>   
  );
}
