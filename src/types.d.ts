export interface Pago {
    id: number;
    personaId: number;
    personaName: string;
    importe: number;
    descripcion?: string;
    fecha: string;
}

export interface Persona {
    id: number;
    name: string;
}

type Balance = Pick<Pago, 'personaName' | 'importe'>;

export interface Deuda {
    personaQueDa?: string;
    personaQueRecibe?: string;
    importe: number;
}
