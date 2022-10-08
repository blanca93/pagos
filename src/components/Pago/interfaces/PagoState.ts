import { PagoInterface } from "./PagoInterface";

export interface PagoState {
    pagos: Array<PagoInterface>;
    newPagos: Array<PagoInterface>;
}