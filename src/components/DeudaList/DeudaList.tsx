import { useState } from 'react';
import { Balance, Deuda } from '../../types';

interface CurrentState {
    deudas: Array<Deuda>;
}

interface Props {
    balances: Array<Balance>
}

export default function DeudaList (props: Props) {

    const [deudas, setDeudas] = useState<CurrentState['deudas']>([]);

    const calculateDeudas = () => {
        let copiaBalances = [...props.balances];
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
                setDeudas(deudas => [...deudas, newDeuda]);
            }
            copiaBalances = [...balancesSinCeros];
        } 
    } 

    return (
        <div>
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