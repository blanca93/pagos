import { useState, useEffect } from 'react';
import './App.css';
import PagoForm from './components/PagoForm/PagoForm';
import Panel from './components/Panel/Panel';
import PersonaForm from './components/PersonaForm/PersonaForm';
import { Pago, Persona } from './types';



const INITIAL_STATE = [
  {
    id: 0,
    personaId: 0,
    personaName: 'Francisco Buyo',
    importe: 100,
    fecha: '2022-09-29T22:33:00',
    descripcion: 'Cena'
  },
  {
    id: 1,
    personaId: 1,
    personaName: 'Alfonso Pérez',
    importe: 10,
    fecha: '2022-09-29T22:59:00',
    descripcion: 'Taxi'
  },
  {
    id: 2,
    personaId: 1,
    personaName: 'Alfonso Pérez',
    importe: 53.40,
    fecha: '2022-09-29T18:33:00',
    descripcion: 'Compra'
  }
];


interface PagoState {
  pagos: Array<Pago>;
}

let pagoId = 3;


function App() {
  const [pagos, setPagos] = useState<PagoState['pagos']>([]);

  useEffect(() => {
    setPagos(INITIAL_STATE);
  }, [])

  const handleNewPago = (newPago: Pago): void => {
    newPago.id = pagoId++;
    setPagos(pagos => [...pagos, newPago])
  }

  return (
    <div className="App">
      <body className="App-body">
         <Panel pagos={pagos}/>
         <PagoForm onNewPago={handleNewPago}/>
      </body>
    </div>
  );
}

export default App;
