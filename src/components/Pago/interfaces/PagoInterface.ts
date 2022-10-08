export interface PagoInterface {
    id: number;
    personaId: number;
    personaName: string;
    importe: number;
    descripcion?: string;
    fecha: Date | undefined;
}