import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'src/app/helpers/Notificaciones';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verificar-otp',
  templateUrl: './verificar-otp.component.html',
  styleUrls: ['./verificar-otp.component.scss']
})
export class VerificarOTPComponent implements OnInit {
  otpForm: FormGroup | any;
  public idUser:string = '';

  constructor(private usuarioService:UsuarioService, private router:Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { 
    this.otpForm = this.fb.group(
      {
        OTP:['',Validators.required],
  });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idUser = params.get('idUsuario'); // Obtener el valor del 'id' de la URL
  });
  }

  //Proceso Validar OTP
  validarOTP()
  {
    let otp = this.otpForm.get('OTP').value
    this.usuarioService.validarOTP(this.idUser,otp)
    .subscribe( resp => {
      //console.log(resp)
      if(!resp.ok)
      {
        Toast.fire({
          icon: 'error',
          title: resp.msg
        })
      }
      else
      {
        this.usuarioService.guardarLocalStorage(resp.token);
         this.router.navigate(['/home']);
      }
    })
  }
}
