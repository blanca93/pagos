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
