import { Genero, Persona, nombresPersona, tipoPersona } from "../models/personas/persona.models";


export interface cargarPersonas
{
    menu: any;
    personas: Persona[];
}

export interface cargarTipoPersona
{
    tipoPersona: tipoPersona[];
}

export interface cargarNombrePersona
{
    persona: nombresPersona[];
}

export interface cargarGenero
{
    ID_GENERO: Number,
    GENERO: string
}

export interface Paises
{
    COD_PAIS: string,
    PAIS: string
}

export interface RangoSalario
{
    ID_RANGO: Number,
    RANGO_SALARIAL: string,
    ESTADO:string
}

export interface sectorLaboral
{
    ID_SECTORLAB: Number,
    SECTOR: string,
    ESTADO:string
}

export interface condicionLaboral
{
    ID_CONDIC_LAB: Number,
    CONDICION: string,
    ESTADO:string
}