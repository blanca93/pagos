import { useEffect, useState } from 'react';
import { Balance, Deuda } from '../../types';

interface CurrentState {
    deudas: Array<Deuda>;
}

interface Props {
    balances: Array<Balance>
}

export default function DeudaList (props: Props) {

    const [deudas, setDeudas] = useState<CurrentState['deudas']>([]);

    const calculateDeudas = (balances: Array<Balance>) => {
        let copiaBalances = [...balances];
        let balancesSinCeros: Array<Balance>;
        let balancePareja: Balance | null;
        
        while(copiaBalances.length > 1) {
            // Quitamos los balances cuyo importe sea cero
            balancesSinCeros = copiaBalances.filter(y => y.importe !== 0);

            if (balancesSinCeros.length > 0) {
                // Buscamos el balance con mayor valor absoluto de importe
                const balanceDeImporteMaximo: Balance = balancesSinCeros.reduce((prev, current) => (Math.abs(prev.importe) >= Math.abs(current.importe)) ? prev : current);
                // Buscamos el siguiente importe de signo contrario con mayor valor absoluto
                const posiblesParejas: Array<Balance> = balancesSinCeros.filter(x => Math.sign(x.importe) !== Math.sign(balanceDeImporteMaximo.importe));
                balancePareja = posiblesParejas.length > 0 ? posiblesParejas.reduce((prev, current) => (Math.abs(prev.importe) >= Math.abs(current.importe)) ? prev : current) : null;
    
                let newDeuda: Deuda;

                if (balancePareja) {
                    const importeASaldar = Math.min(Math.abs(balanceDeImporteMaximo.importe), Math.abs(balancePareja.importe));
                    if (balanceDeImporteMaximo.importe > 0) {
                        newDeuda = {personaQueDa: balancePareja.personaName, personaQueRecibe: balanceDeImporteMaximo.personaName, importe: importeASaldar}
                    } else {
                        newDeuda = {personaQueRecibe: balancePareja.personaName, personaQueDa: balanceDeImporteMaximo.personaName, importe: importeASaldar}
                    }

                    // Actualizamos la lista
                    const newBalanceDeImporteMaximo: Balance = {personaName: balanceDeImporteMaximo.personaName, importe: Math.round((balanceDeImporteMaximo.importe - (importeASaldar * (Math.sign(balanceDeImporteMaximo.importe))))*100)/100};
                    balancesSinCeros.splice(balancesSinCeros.indexOf(balanceDeImporteMaximo), 1, newBalanceDeImporteMaximo);

                    const newBalancePareja: Balance = {personaName: balancePareja.personaName, importe: Math.round((balancePareja.importe + (importeASaldar * (Math.sign(balanceDeImporteMaximo.importe))))*100)/100};
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

    useEffect(() => {
        calculateDeudas(props.balances);
    }, [props.balances])

    return (
        <div>
            <h2>Deudas</h2>
            {
                deudas?.map((deuda, i) => {
                    return (
                        <ul>
                            <li key={i}>
                                {deuda.personaQueDa} le debe a {deuda.personaQueRecibe} {deuda.importe} euros
                            </li>
                        </ul>
                    )
                })
            }             
        </div>
    );
}
