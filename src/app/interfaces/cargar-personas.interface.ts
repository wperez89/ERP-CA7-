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