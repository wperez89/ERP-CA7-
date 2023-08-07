import { Operacion, tipoGarantia, tipoPlanInv, tipoLineaCredito, OperacionesVista } from "../models/credito/credito.models";


export interface cargarOperaciones
{
    operaciones: OperacionesVista[];
}

export interface cargarTipoGarantia
{
    garantia:tipoGarantia[];
}

export interface cargarTipoPlanInversion
{
    planInv: tipoPlanInv[];
}

export interface cargarLineaCreditos
{
    LineaCred: tipoLineaCredito[];
}