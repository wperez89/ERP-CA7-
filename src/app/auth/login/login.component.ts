import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MyserviceService } from '../../myservice.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/helpers/Notificaciones';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  loginForm: FormGroup | any; 
  msg = '';
  validado:Boolean;
  idUsuario:string =''

  constructor(private service: MyserviceService,private usuarioService:UsuarioService, private router: Router, 
    private fb: FormBuilder,) { 
    this.loginForm = new FormGroup({
      email:new FormControl(localStorage.getItem('email') || '', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl([false]),
  });
  }

  check(uname: string, p: string) {
    const output = this.service.checkusernameandpassword(uname, p);
    if (output == true) {
      this.router.navigate(['/home']);
    } else {
      this.msg = 'Usuario o contraseña no coinciden';
    }
  }

  //Proceso de Boton de Loguearse
  login()
  {
    this.usuarioService.validarUsuario(this.loginForm.get('email').value)
    .subscribe(resp=>
      {
        console.log(resp)
        this.validado = resp.VALIDADO
        this.idUsuario = resp.ID_USUARIO

        if(!resp.ok)
        {
          console.log(resp.msg)
          Toast.fire({
            icon: 'error',
            title: resp.msg
          })
        }
        if(!this.validado)
      {
        //console.log(this.idUsuario)
        this.router.navigate(['/validarlogin',this.idUsuario]);
      }
      else
      {
        //Realizar el login
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {
      console.log(resp)
        if(this.loginForm.get('remember').value)
        {
          localStorage.setItem('email',this.loginForm.get('email').value);
      }
      else
      {
        localStorage.removeItem('email');
      }
      
        // Navegar al Dashboard
        this.router.navigate(['/verify-otp/' + this.idUsuario]);

      }, (err) => { // Si sucede un error
        //console.log(err.error.error.password.msg);
        Toast.fire({
          icon: 'error',
          title: err.error[1]
        })
        if(err.error.error)
        {
          if(err.error.error)
          {
            Toast.fire({
              icon: 'error',
              title: err.error.error.password.msg
            })
          }
          else
          {
            Toast.fire({
              icon: 'error',
              title: err.error.error.email.msg
            })
          }
        }
      });
      }
      })      
  }

  login1()
  {
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {

      if(this.loginForm.get('remember').value)
        {
          localStorage.setItem('email',this.loginForm.get('email').value);
      }
      else
      {
        localStorage.removeItem('email');
      }

      if(!resp.ok)
      {
        Toast.fire({
          icon: 'error',
          title: resp.msg
        })
      }
      else
      {
        this.usuarioService.validarUsuario(this.loginForm.get('email').value)
    .subscribe(resp=>
      {
        this.validado = resp.VALIDADO
        this.idUsuario = resp.ID_USUARIO
      
        if(!this.validado)
        {
          this.router.navigate(['/validarlogin',this.idUsuario]);
        }
        else
        {
          this.router.navigate(['/verify-otp/' + this.idUsuario]);
        }
      }) 
      }
      }),(err)=>
      {
        console.log(err)
        Toast.fire({
          icon: 'error',
          title:"error"
        })
      }
  }
}
