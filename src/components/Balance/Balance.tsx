import { useState, useEffect } from 'react';
import { Persona, Pago, Balance, Deuda } from '../../types';
import './Balance.css';

interface CurrentState {
    balances: Array<Balance>;
    deudas: Array<Deuda>;
}

export default function BalanceList () {

    const [balances, setBalances] = useState<CurrentState['balances']>([]);
    const [deudas, setDeudas] = useState<CurrentState['deudas']>([]);

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

    const calculateDeudas = () => {
        let copiaBalances = [...balances];
        let balancesSinCeros: Array<Balance>;
        let balancePareja: Balance;
        
        while(copiaBalances.length > 1) {
            // Quitamos los balances cuyo importe sea cero
            balancesSinCeros = copiaBalances.filter(y => y.importe !== 0);

            if (balancesSinCeros.length > 0) {
                // Buscamos el balance con mayor valor absoluto de importe
                const balanceDeImporteMaximo: Balance = balancesSinCeros.reduce((prev, current) => (Math.abs(prev.importe) >= Math.abs(current.importe)) ? prev : current);
                // Buscamos el siguiente importe de signo contrario con mayor valor absoluto
                balancePareja = balancesSinCeros.filter(x => Math.sign(x.importe) !== Math.sign(balanceDeImporteMaximo.importe))
                    .reduce((prev, current) => (Math.abs(prev.importe) >= Math.abs(current.importe)) ? prev : current);
    
                let newDeuda: Deuda;

                if (balancePareja) {
                    const importeASaldar = Math.min(Math.abs(balanceDeImporteMaximo.importe), Math.abs(balancePareja.importe));
                    if (balanceDeImporteMaximo.importe > 0) {
                        newDeuda = {personaQueDa: balancePareja.personaName, personaQueRecibe: balanceDeImporteMaximo.personaName, importe: importeASaldar}
                    } else {
                        newDeuda = {personaQueRecibe: balancePareja.personaName, personaQueDa: balanceDeImporteMaximo.personaName, importe: importeASaldar}
                    }
                    console.log(newDeuda)
                    setDeudas(deudas => [...deudas, newDeuda])

                    // Actualizamos la lista
                    const newBalanceDeImporteMaximo: Balance = {personaName: balanceDeImporteMaximo.personaName, importe: balanceDeImporteMaximo.importe - importeASaldar * (Math.sign(balanceDeImporteMaximo.importe))};
                    balancesSinCeros.splice(balancesSinCeros.indexOf(balanceDeImporteMaximo), 1, newBalanceDeImporteMaximo);

                    const newBalancePareja: Balance = {personaName: balancePareja.personaName, importe: balancePareja.importe + importeASaldar * (Math.sign(balancePareja.importe))};
                    balancesSinCeros.splice(balancesSinCeros.indexOf(balancePareja), 1, newBalancePareja);

                } else {
                    // Añadimos la última deuda que no tiene pareja
                    if (balanceDeImporteMaximo.importe > 0) {
                        newDeuda = {personaQueRecibe: balanceDeImporteMaximo.personaName, importe: balanceDeImporteMaximo.importe}
                    } else {
                        newDeuda = {personaQueDa: balanceDeImporteMaximo.personaName, importe: balanceDeImporteMaximo.importe}
                    }
                }
            }
            copiaBalances = [...balancesSinCeros];
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
            <h2>Deudas</h2>
            {
                deudas?.map((deuda, i) => {
                    return (
                        <ul>
                            <li key={i}>
                                Persona que da: {deuda.personaQueDa}
                                Persona que recibe: {deuda.personaQueRecibe}
                                Importe: {deuda.importe}
                            </li>
                        </ul>
                    )
                })
            }             
        </div>
    );
}
