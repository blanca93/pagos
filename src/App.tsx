import { useState, useEffect, useRef } from 'react';
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

interface PagoState {
  pagos: Array<Pago>;
  newPago: Pago;
}


function App() {
  const [pagos, setPagos] = useState<PagoState['pagos']>([]);
  const [newPago, setNewPago] = useState<PagoState['newPago']>({
    id: 0,
    personaId: 0,
    personaName: '',
    importe: 0,
    fecha: undefined
  });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPagos(INITIAL_STATE)
  }, [])

  const handleNewPago = (newPago: Pago): void => {
    setPagos(pagos => [...pagos, newPago])
  }

  return (
    <div className="App" ref={divRef}>
      <body className="App-body">
         <Panel pagos={pagos}/>
         <PagoForm onNewPago={handleNewPago}/>
      </body>
    </div>
  );
}

export default App;
