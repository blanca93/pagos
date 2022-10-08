import { useState, useEffect } from 'react';
import './App.css';
import { PagoState } from './components/Pago/interfaces/PagoState';
import Pago from './components/Pago/Pago';
import Panel from './components/Panel/Panel';


const INITIAL_STATE = [
  {
    id: 0,
    personaId: 0,
    personaName: 'Francisco Buyo',
    importe: 100,
    fecha: new Date(),
    descripcion: 'Cena'
  },
  {
    id: 1,
    personaId: 1,
    personaName: 'Alfonso Pérez',
    importe: 10,
    fecha: new Date(),
    descripcion: 'Taxi'
  },
  {
    id: 2,
    personaId: 1,
    personaName: 'Alfonso Pérez',
    importe: 53.40,
    fecha: new Date(),
    descripcion: 'Compra'
  }
];


function App() {
  const [pagos, setPagos] = useState<PagoState['pagos']>();
  const [newPagos, setNewPagos] = useState<PagoState['newPagos']>();

  useEffect(() => {
    setPagos(INITIAL_STATE)
  }, [])

  return (
    <div className="App">
      <body className="App-body">
         <Panel pagos={pagos!}/>
         <Pago />
      </body>
    </div>
  );
}

export default App;
