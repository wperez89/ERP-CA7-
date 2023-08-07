import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm: FormGroup;

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService,private router: Router) {
    this.passwordForm = this.fb.group(
    {
      Identificacion:['',Validators.required],
      email:['',Validators.required],
    }
  ) }

  ngOnInit(): void {
  }

  changePassword()
  {
    //console.log(this.passwordForm.value)
    this.usuarioService.forgotPassword(this.passwordForm.value)
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
    this.passwordForm.reset();

  }
}
