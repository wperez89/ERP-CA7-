import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { MenuFrontService } from 'src/app/services/menu-front.service';

@Component({
  selector: 'app-sub-menu-agregar',
  templateUrl: './sub-menu-agregar.component.html',
  styleUrls: ['./sub-menu-agregar.component.scss']
})
export class SubMenuAgregarComponent implements OnInit {

  
  submenuForm: FormGroup;
  menuHijo: [];
  subMenu:boolean = true;
  edit:boolean = false;
  hasParams:boolean = false;
  idMenu: number = 0;
  cargando: boolean = true;

  constructor(private menuservice: MenuFrontService, private fb:FormBuilder, private route: ActivatedRoute,
    private router: Router) {
    this.submenuForm= this.fb.group(
      {
        ID:[''],
        LINK:['', Validators.required],
        TITLE:['',Validators.required],
        ICON:['',Validators.required],
        CLASS:['feather'],
        EXTRALINK:[0,],
        parent_id:['',Validators.required],
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
      this.subMenu = true;
      this.edit = true
      this.cargarMainMenu();
      this.cargarSubMenuID();
      this.cargando = false;
    }
    else
    {
      this.cargarMainMenu();
      this.subMenu = true;
      this.edit = false;
      this.cargando = false;
    }
  }

  cargarMainMenu()
  {
    //console.log(this.idMenu)
    this.menuservice.cargarParentMenu()
    .subscribe((resp:any)=>
    {
      this.menuHijo = resp
    })
  }

  cargarSubMenuID()
  {
    //console.log(this.idMenu)
    this.menuservice.cargarSubMenuId(this.idMenu)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      //console.log(resp[0].parent_id)
      this.submenuForm.patchValue({
        ID:resp[0].ID,
        TITLE:resp[0].TITLE,
        ICON:resp[0].ICON,
        LINK:resp[0].LINK,
        parent_id:parseInt(resp[0].parent_id),
      })
    })
  }

  createSubMenu()
  {
    //console.log(this.submenuForm.value);
    //console.log(this.edit);
    if (this.submenuForm.invalid) {
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
    this.menuservice.crearOpcionSubMenu(this.submenuForm.value)
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
          this.submenuForm.reset();
          this.router.navigate(['/usuario/usersubmenu']);
          window.location.reload();
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
      this.menuservice.udpateOpcionMainMenu(this.submenuForm.value)
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
          this.submenuForm.reset();
          this.router.navigate(['/usuario/usersubmenu']);
          window.location.reload();
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
