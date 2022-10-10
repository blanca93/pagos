import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes , Route, Link } from 'react-router-dom';
import './App.css';
import PagoForm from './components/PagoForm/PagoForm';
import Panel from './components/Panel/Panel';
import { Pago } from './types';



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
  pagoId: number;
}


function App() {
  const [pagos, setPagos] = useState<PagoState['pagos']>([]);
  const [pagoId, setPagoId] = useState<PagoState['pagoId']>(3);

  useEffect(() => {
    setPagos(INITIAL_STATE);
  }, [])

  const handleNewPago = (newPago: Pago): void => {
    newPago.id = pagoId;
    setPagoId(pagoId => pagoId + 1)    
    setPagos(pagos => [...pagos, newPago])
  }

  return (
    <div className="App">
      <header className="App-body">
         <Panel pagos={pagos}/>
         <PagoForm onNewPago={handleNewPago}/>
      </header>
    </div>
  );
}

export default App;
