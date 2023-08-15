import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { MenuFrontService } from 'src/app/services/menu-front.service';

@Component({
  selector: 'app-menu-agregar',
  templateUrl: './menu-agregar.component.html',
  styleUrls: ['./menu-agregar.component.scss']
})
export class MenuAgregarComponent implements OnInit {

  menuForm: FormGroup;
  menupadre: [];
  mainMenu:boolean = true;
  edit:boolean = false;
  hasParams:boolean = false;
  idMenu: number = 0;
  public cargando: boolean = true;

  constructor(private menuservice: MenuFrontService, private fb:FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.menuForm= this.fb.group(
      {
        ID:[''],
        LINK:[null,!this.edit ? Validators.nullValidator : Validators.required],
        TITLE:['',Validators.required],
        ICON:['',Validators.required],
        CLASS:['feather'],
        EXTRALINK:[0,],
        parent_id:[null,!this.edit ? Validators.nullValidator: Validators.required],
      });
   }

  ngOnInit(): void {
    this.hasParams = this.route.snapshot.paramMap.keys.length > 0;
    if(this.hasParams)
    {
      this.idMenu = this.route.snapshot.params['id'];

    }
    this.verificarParametros() 
    
  }

  verificarParametros() {
    if(this.hasParams)
    {
      this.mainMenu = true;
      this.edit = true
      this.menuForm.patchValue({
        ID:this.idMenu,
        TITLE:this.route.snapshot.params['title'],
        ICON:this.route.snapshot.params['icon'],
      })
      this.cargando = false;
    }
    else
    {
      this.cargarMainMenu();
      this.mainMenu = true;
      this.edit = false
      this.cargando = false;
    }
  }

  cargarMainMenu()
  {
    this.menuservice.cargarMainMenu()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.menupadre = resp
    })
  }

  createMenu()
  {
    if (this.menuForm.invalid) {
      Toast.fire(
        {
          text:("LLenar todos los campos")
        }
      );
      return;
    }
    if(!this.edit)
    {
      //console.log(this.menuForm.value);
    this.menuservice.crearOpcionMainMenu(this.menuForm.value)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.menuForm.reset();
          this.router.navigate(['/usuario/usermainmenu']);
      }
    },
    (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
    }
    else
    {
      //console.log("Editado")
      this.menuservice.udpateOpcionMainMenu(this.menuForm.value)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.menuForm.reset();
          this.router.navigate(['/usuario/usermainmenu']);
      }
    },
    (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
    }
  }
}
