import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Usuario, password } from '../models/User/usuario.models';
import { Roles } from '../models/User/roles.models';
import { loginForm } from '../interfaces/login-form.interfaces';
import { cargarUsuarios, img, rol } from '../interfaces/cargar-usuarios.interfaces';


const base_url = environment.base_urlSql;
declare const gapi:any

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public usuario: Usuario
  public rol:Roles | any
  public auth2:any;
  constructor(private http: HttpClient, private router: Router, private ngzone: NgZone) { }
  
   //Guardar localStorage
   guardarLocalStorage(token:string)
   {
       localStorage.setItem('token',token);
       //localStorage.setItem('menu', JSON.stringify(menu));
   }
  //Obtener Token de Usuario
    get token(): string
    {
        return localStorage.getItem('token') || '';
    }
    //Obtener el header
get headers()
{
  return {
    headers:{
      'x-token':this.token
    }
  }
}


   //Obtener UID de Usuario
   get getIdUsuario():string
   {
     return this.usuario.ID_USUARIO || '';
   }

   //Obtener Rol de Usuario
   get role():string
   {
    //console.log(this.usuario.ROL)
   return this.usuario.ROL;
   }
 
   public user: any
   //Validar token con servicio RenewLogin
   ValidarToken(): Observable<boolean>
   {
       return this.http.get(`${base_url}/login/renew`,{
       }).pipe(
        map((resp: any)=>{
          //console.log(resp.usuarioDB[0])
          this.usuario = resp.usuarioDB[0];
          this.guardarLocalStorage(resp.token);

          return true;
      }),
       catchError(error=> of(false)) //El of devuelve un False
       );
   }

   //Proceso de Login
   login(formData: loginForm)
   {
       return this.http.post(`${base_url}/login`,formData)
       .pipe(
        tap((resp:any)=>{
          this.guardarLocalStorage(resp.token);
        })
      );
   }

   //Validar Usuario si está Activado
   validarUsuario(email:string)
   {
    const url = `${base_url}/login/validarUser/${email}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        validado:{VALIDADO}
      })=>resp.validado[0])
    )    
   }

   //Validar Usuario si está Activado
   validarOTP(id:string, otp:number)
   {
    const url = `${base_url}/login/validarOTP/${id}/${otp}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean, 
        token:string,
        msg:string
      })=>resp)
    )    
   }

   //Proceso de Logout
   logOut()
 {
   localStorage.removeItem('token');
   this.router.navigateByUrl('/login');
 }

   //Cargar Usuarios de Base de Datos
   cargarUsuarios()
   {
     const url = `${base_url}/mantenimiento/user`;
     return this.http.get<cargarUsuarios>(url,this.headers)
     .pipe(
       map(resp=>{
         const usuarios = resp.usuarios.map(
           user => new Usuario(user.NOMBRE, user.APELLIDO1,user.EMAIL,user.ESTADO,user.ID_USUARIO,user.APELLIDO2,"",
             user.IMG,user.ROL)
         );
         return {
           usuarios,
         };
       })
     )
     //return this.http.get(url,this.headers);
   }

  cargarRolUsuario()
   {
     const url = `${base_url}/mantenimiento/rol`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         roles:rol[]
       })=>resp.roles)
     );

   }

   //Cargar Usuarios de Base de Datos
  cargarUsuariosActivos()
   {
     const url = `${base_url}/mantenimiento/user/Active`;
     return this.http.get<cargarUsuarios>(url,this.headers)
     .pipe(
       map(resp=>{
         const usuarios = resp.usuarios.map(
           user => new Usuario(user.NOMBRE, user.APELLIDO1,user.EMAIL,user.ESTADO,user.ID_USUARIO,user.APELLIDO2,"",
             user.IMG,user.ROL)
         );
         return {
           usuarios,
         };
       })
     )
   }
//Crear Usuario
crearPersonas(user:Usuario)
{
  const url = `${base_url}/mantenimiento/user`;
  return this.http.post(url,user)
        .pipe(
          map((resp:{
            ok:boolean, 
            usuario:Usuario[]
          })=>resp.usuario)
        );
}

//Actualizar Usuario
updatePersonas(user:Usuario, _id:string)
  {
    const url = `${base_url}/mantenimiento/user/${_id}`;
    //console.log(url)
    return this.http.put(url,user,)
  }

//Crear Usuario
crearROL(rol:Roles)
{
  const url = `${base_url}/mantenimiento/rol`;
  return this.http.post(url,rol)
        .pipe(
          map((resp:{
            ok:boolean, 
            roles:Roles[]
          })=>resp.roles)
        );
}

//Obtener Usuario por ID
getUserID(_id:string)
{
  const url = `${base_url}/mantenimiento/user/${_id}`;
     return this.http.get(url)
     .pipe(
      map((resp:{
        ok:boolean, 
        usuarios:Usuario[]
      })=>resp.usuarios[0])
     )    
}

//Obtener Usuario por ID
getUserCedula(_id:string)
{
  const url = `${base_url}/mantenimiento/userCed/${_id}`;
     return this.http.get(url)
     .pipe(
      map((resp:{
        ok:boolean, 
        usuarios:[]
      })=>resp.usuarios)
     )    
}

//Cargar Usuarios de Base de Datos
verImagen(containerName: string,nombreImagen: string): string {
  //console.log(`${base_url}/imagen/${containerName}/${nombreImagen}`)
  return `${base_url}/imagen/${containerName}/${nombreImagen}`;
}

//Proceso de Login
changePassword(change: password, id:string)
{
  //console.log(`${base_url}/changepassword/${id}`)
    return this.http.put(`${base_url}/mantenimiento/changepassword/${id}`,change)
    .pipe(
      map((resp:{
        ok:boolean,
        msg:string 
      })=>resp)
   );
}

forgotPassword(change: any)
{
  return this.http.put(`${base_url}/login/forgotPassword`,change)
    .pipe(
      map((resp:{
        ok:boolean,
        msg:string 
      })=>resp)
   );
}
}