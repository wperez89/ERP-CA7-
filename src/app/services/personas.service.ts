import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Paises, RangoSalario, cargarGenero, cargarNombrePersona, cargarPersonas, condicionLaboral, sectorLaboral } from '../interfaces/cargar-personas.interface';
import { Persona, Profesional, ProfesionalesLista, datosPersonas, nombresPersona } from '../models/personas/persona.models';
import { map } from 'rxjs';

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient, private router: Router) { }

//Guardar localStorage
  /*guardarLocalStorage(menu: any)
  {
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  */

   //Cargar Usuarios de Base de Datos
   cargarPersonas()
   {
     const url = `${base_url}/mantenimiento/persona`;
     return this.http.get<cargarPersonas>(url)
     .pipe(
       map(resp=>{
        //console.log(resp.menu)
         const personas = resp.personas.map(
           x => new Persona(x.TIPO_PERSONA,x.IDENTIFICACION,x.NOMBRE,x.GENERO,x.FECHA,x.APELLIDO1,x.PAIS,x.APNFDS,x.APELLIDO2,x.ID)
         );
         //this.guardarLocalStorage(resp.menu);
         return {
          personas
         };
       })
     )
     //return this.http.get(url,this.headers);
   }

   cargarTipoPersona()
   {
     const url = `${base_url}/mantenimiento/persona/tipo`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         tipoPersona:{COD_PERSONA,DESCRIPCION}
       })=>resp.tipoPersona)
     );
   }

   cargarTipoGenero()
   {
     const url = `${base_url}/mantenimiento/persona/genero`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         tipoGenero:cargarGenero
       })=>resp.tipoGenero)
     );
   }

   cargarTipoPais()
   {
     const url = `${base_url}/mantenimiento/persona/pais`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         tipoPais:Paises
       })=>resp.tipoPais)
     );
   }

   cargarRangoSalarial()
   {
     const url = `${base_url}/mantenimiento/persona/rangosalario`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         rango:RangoSalario
       })=>resp.rango)
     );
   }

   cargarCondicionLaboral()
   {
     const url = `${base_url}/mantenimiento/persona/condicionlab`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         condicion:condicionLaboral
       })=>resp.condicion)
     );
   }

   cargarSectorLaboral()
   {
     const url = `${base_url}/mantenimiento/persona/sectorLab`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         sector:sectorLaboral
       })=>resp.sector)
     );
   }

          //Crear Usuario
  crearPersonas(user:Persona)
  {
    if(user.TIPO_PERSONA != 2)
    {
      const url = `${base_url}/mantenimiento/personaFisico`;
      return this.http.post(url,user)
    }
    else
    {
      const url = `${base_url}/mantenimiento/personaJuridico`;
      return this.http.post(url,user)
    }
        
  }

//Obtener Usuario por ID
  getPersonaID(id:string, tipo:number)
  {
    const url = `${base_url}/mantenimiento/persona/${tipo}/${id}`;
      return this.http.get(url)
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:Persona[]
        })=>resp.persona[0])
      )    
  }

//Obtener Usuario por ID
getPersonaEmail_ID(cedula:string)
{
  const params = new HttpParams().set('cedula', cedula);
    const url = `${base_url}/mantenimiento/cedulapersonaEmail`;
      return this.http.get(url,{params})
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:nombresPersona[],
        })=>resp)
      )    
}

  getExisteDatos(id:string)
  {
    const url = `${base_url}/mantenimiento/existepersonadatos/${id}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        existe:{EXISTE}
      })=>resp.existe[0])
    )    
  }

  getExistePersona(id:string)
  {
    const url = `${base_url}/mantenimiento/existepersona/${id}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        Asociado:any
      })=>resp)
    )    
  }
  
//Obtener Datos de Personas por ID
  getDatosPersonaID(id:string)
  {
    const url = `${base_url}/mantenimiento/personadatos/${id}`;
      return this.http.get(url)
      .pipe(
        map((resp:{
          ok:boolean, 
          datos:Persona[]
        })=>resp.datos[0])
      )    
  }

//Obtener persona por ID
  getNombresPersonaID(id:string)
  {
    const url = `${base_url}/mantenimiento/nombrepersona/${id}`;
      return this.http.get(url)
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:cargarNombrePersona[]
        })=>resp.persona[0])
      )    
  }
  //Obtener persona por ID
  getNombresPersonabyCedula(cedula:string)
  {
    const params = new HttpParams().set('cedula', cedula);
    const url = `${base_url}/mantenimiento/cedulapersona`;
      return this.http.get(url,{params})
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:nombresPersona[],
          msg:string
        })=>resp)
      )    
  }
  //Actualizar Usuario por ID
  updatePersonaID(id:string,persona:Persona)
  {
    const url = `${base_url}/mantenimiento/updateFisico/${id}`;
      return this.http.put(url,persona)
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:Persona[]
        })=>resp.persona[0])
      )    
  }

  crearDatosPersonas(datos:datosPersonas,id:string)
  {
      const url = `${base_url}/mantenimiento/personadatos/${id}`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          datos:datosPersonas[]
        })=>resp)
      )            
  }

  //Actualizar Usuario por ID
  updateDatosPersonaID(id:string,datos:datosPersonas)
  {
    //console.log(datos);
    const url = `${base_url}/mantenimiento/updpersonadatos/${id}`;
      return this.http.put(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          datos:datosPersonas[]
        })=>resp)
      )    
  }

  //Obtener profesional por ID
  getListaProfesionales(estado:string)
  {
    const params = new HttpParams().set('estado', estado);
    const url = `${base_url}/mantenimiento/profesional`;
      return this.http.get(url,{params})
      .pipe(
        map((resp:{
          ok:boolean, 
          profesionales:ProfesionalesLista[]
        })=>resp)
      )    
  }

   //Obtener profesional por Tipo de Profesional
   getListaProf_Tipo(profesion:number)
   {
     const params = new HttpParams().set('profesion', profesion);
     const url = `${base_url}/mantenimiento/profesionalTipo`;
       return this.http.get(url,{params})
       .pipe(
         map((resp:{
           ok:boolean, 
           profesionales:ProfesionalesLista[]
         })=>resp.profesionales)
       )    
   }

      //Obtener profesional por Tipo de Profesional
   getProfesionalID(id:string)
   {
     const params = new HttpParams().set('id', id);
     const url = `${base_url}/mantenimiento/profesionalid`;
       return this.http.get(url,{params})
       .pipe(
         map((resp:{
           ok:boolean, 
           profesional:ProfesionalesLista[]
         })=>resp.profesional)
       )    
   }

   //Obtener persona por ID
  getPersonaAPI(id:string)
  {
    const url = `${base_url}/mantenimiento/cedulaapi/${id}`;
    //console.log(url);
      return this.http.get(url)
      .pipe(
        map((resp:{
          ok:boolean, 
          persona:[],
          msg:string
        })=>resp)
      )    
  }

    //Obtener infoLaboral por ID
    getInfoLaboral(id:string)
    {
      const url = `${base_url}/mantenimiento/persona/infoLab/${id}`;
      //console.log(url);
        return this.http.get(url)
        .pipe(
          map((resp:{
            ok:boolean, 
            laboral:[],
          })=>resp.laboral)
        )    
    }
  

  crearProfesional(datos:Profesional)
  {
      const url = `${base_url}/mantenimiento/profesional`;
      return this.http.post(url,datos)
      .pipe(
        map((resp:{
          ok:boolean, 
          profesional:Profesional,
          msg:string
        })=>resp)
      )            
  }

    //Obtener persona por ID
    updateActiveProfesional(body:any)
    {
      const url = `${base_url}/mantenimiento/profesionalActive`;
      return this.http.post(url,body)
        .pipe(
          map((resp:{
            ok:boolean,
            msg:string
          })=>resp)
        )    
    }

     //Obtener persona por ID
     updateInactiveProfesional(body:any)
     {
       const url = `${base_url}/mantenimiento/profesionalInactive`;
       return this.http.put(url,body)
         .pipe(
           map((resp:{
             ok:boolean,
             msg:string
           })=>resp)
         )    
     }
}

