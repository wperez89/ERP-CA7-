import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: ['./validar-cuenta.component.scss']
})
export class ValidarCuentaComponent implements OnInit {
  public passwordForm: FormGroup;
  public idUser:string = '';
  
  constructor(private usuarioService:UsuarioService, private fb:FormBuilder,private router: Router,
    private activatedRoute: ActivatedRoute) { 
    this.passwordForm = this.fb.group(
      {
        OldPass:['',Validators.required],
        newPass:['',Validators.required],
        confirmPass:['',Validators.required],
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.idUser = params.get('idUsuario');
  });
  }

  updatePassword()
  {
    //console.log(this.passwordForm.valid)
    if(!this.passwordForm.valid)
    {
      Toast.fire({
        title:"Complete todos los campos"
      })
    }
    else {
      this.usuarioService.changePassword(this.passwordForm.value,this.idUser)
    .subscribe(resp=>{
    //console.log(resp);
    if(!resp.ok)
    {
      Toast.fire({
        title:resp.msg
      })
    }
    else
    {
      SuccessDialog.fire(
        {
          title:resp.msg
        }
      );
      this.router.navigate(['/']);
    }
    },
    (err) => { // Si sucede un error
        
      console.log(err);
      errorDialog.fire({
        title:err
      })
    })
  }
    }
 
}
