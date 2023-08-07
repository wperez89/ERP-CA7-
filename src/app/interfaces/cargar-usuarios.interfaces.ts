import { Usuario } from '../models/User/usuario.models';
import { Roles } from '../models/User/roles.models';

export interface cargarUsuarios
{
    total: number; 
    usuarios: Usuario[];
    menu: any;
}

export interface rol
{
    ROL:string,
    DESCRIPCION:string,
    ID_ROL?:number
}

export interface img
{
    containerName:string,
    nombreImagen:string
}
