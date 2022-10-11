import { useState, useEffect } from 'react';
import { Persona, Pago, Balance } from '../../types';
import DeudaList from '../DeudaList/DeudaList';
import './BalanceList.css';

interface CurrentState {
    balances: Array<Balance>;
}

export default function BalanceList () {

    const [balances, setBalances] = useState<CurrentState['balances']>([]);

    const calculateBalances = () => {
        const storedPagos = localStorage.getItem('pagos');
        const storedPersonas = localStorage.getItem('personas');
        let pagos: Array<Pago>;
        let personas: Array<Persona>;
        if (storedPagos == null || storedPersonas == null) {
            alert("Faltan datos en el localStorage")
        } else {
            pagos = JSON.parse(storedPagos);
            personas = JSON.parse(storedPersonas);

            // Balance (esto se debería hacer por id de persona, no por nombre, por si el nombre se repite)
            const totalDinero = pagos.map(x => x.importe).reduce((sum, y) => sum + y, 0);
            const debePorPersona = totalDinero / personas.length;

            personas.forEach(z => {
                const pagosHechosPorZ = pagos.filter(a => a.personaName === z.name);
                const importeAportado = pagosHechosPorZ.map(b => b.importe).reduce((sum, y) => sum + y, 0);
                const importe = importeAportado - debePorPersona;
                const newBalance: Balance = {personaName: z.name, importe: Math.round(importe*100)/100}
                setBalances(balances => [...balances, newBalance])
            })
            
        }
    } 

    useEffect(() => {
        calculateBalances();
    }, []);

    return (
        <div className="balance-container" role="table" aria-label="Balances">
            <h2>Balance</h2>
            <div className="flex-table header" role="rowgroup">
            <div className="flex-row" role="columnheader">PERSONA</div>
            <div className="flex-row" role="columnheader">IMPORTE</div>
            </div>
            {
            balances?.map((balance, index) => {
                return (
                <div key={index} className="flex-table row" role="rowgroup">
                    <div className="flex-row" role="cell">{balance.personaName}</div>
                    <div className="flex-row" role="cell">{balance.importe}</div>
                </div>
                )
            }) 
            } 
            <DeudaList balances={balances}/>       
        </div>
    );
}
