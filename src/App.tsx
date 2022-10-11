import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes , Route, Link } from 'react-router-dom';
import './App.css';
import BalanceList from './components/Balance/Balance';
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

  useEffect(() => {
    localStorage.setItem('pagos', JSON.stringify(pagos));
  }, [pagos]);

  const handleNewPago = (newPago: Pago): void => {
    newPago.id = pagoId;
    setPagoId(pagoId => pagoId + 1)    
    setPagos(pagos => [...pagos, newPago])
  }

  return (
    <Router>
      <div className="App">
        <header className="App-body">
            <ul>
              <li>
                <Link to="/">Tabla de pagos</Link>
              </li>
              <li>
                <Link to="/pago">Añadir un pago</Link>
              </li>
              <li>
                <Link to="/balance">Ver balance</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<Panel pagos={pagos}/>} />
              <Route path="/pago" element={<PagoForm onNewPago={handleNewPago}/>} />    
              <Route path="/balance" element={<BalanceList />} />                
            </Routes>        
        </header>
      </div>
    </Router>
    
  );
}

export default App;
