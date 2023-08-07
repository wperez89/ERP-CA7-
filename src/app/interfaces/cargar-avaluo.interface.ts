import { AvaluoLista, infoAvaluos } from "../models/avaluos/avaluo.models";
import { Canton, Distrito, Provincia } from "../models/global";

export interface cargarListaAvaluos
{
    avaluos: AvaluoLista[];
}

export interface cargarProvincia
{
    provincia:Provincia[];
}

export interface cargarCanton
{
    canton:Canton[];
}

export interface cargarDistrito
{
    distrito:Distrito[];
}
export interface cargarInfoAvaluos
{
    ok:boolean,
    avaluos:infoAvaluos[]
}
