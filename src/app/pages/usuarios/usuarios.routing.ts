import { Routes } from '@angular/router';
import { NuevoComponent } from './nuevo/nuevo.component';
import { UsuariosComponent } from './usuarios.component';
import { EditComponent } from './edit/edit.component';
import { PasswordComponent } from './password/password.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { MenuAgregarComponent } from './menu-agregar/menu-agregar.component';
import { SubmenuUsuarioComponent } from './submenu-usuario/submenu-usuario.component';
import { SubMenuAgregarComponent } from './sub-menu-agregar/sub-menu-agregar.component';
import { RolMenuComponent } from './rol-menu/rol-menu.component';
import { EditRolMenuComponent } from './edit-rol-menu/edit-rol-menu.component';

export const UsuariosRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'usuario',
				pathMatch: 'full'
			},
            {
                path: '',
				component: UsuariosComponent,
				data: {
					title: 'Usuarios',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios' }
					]
				}
            },
			{
                path: 'newuser',
				component: NuevoComponent,
				data: {
					title: 'Nuevo Usuario',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Nueva Persona' }
					]
				}
            },
			{
                path: 'usermainmenu',
				component: MenuUsuarioComponent,
				data: {
					title: 'Menu Usuario',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario' }
					]
				}
            },
			{
                path: 'usersubmenu',
				component: SubmenuUsuarioComponent,
				data: {
					title: 'SubMenu Usuario',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario', url: '/usuario/usermainmenu' },
						{ title: 'SubMenú' }
					]
				}
            },
			{
                path: 'addusermenu',
				component: MenuAgregarComponent,
				data: {
					title: 'Menu Usuario',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario', url: '/usuario/usermainmenu'},
						{ title: 'Agregar Menu' }
					]
				}
            },
			{
                path: 'adduserSubmenu',
				component: SubMenuAgregarComponent,
				data: {
					title: 'SubMenu Usuario',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario', url: '/usuario/usermainmenu'},
						{ title: 'SubMenu', url: '/usuario/usersubmenu'},
						{ title: 'Agregar SubMenu' }
					]
				}
            },
			{
                path: 'usermenu/main/:Menu/:class/:icon/:extralink/:title/:id',
				component: MenuAgregarComponent,
				data: {
					title: 'Editar Opción Principal Menú',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario', url: '/usuario/usermainmenu'},
						{ title: 'Editar Menú' }
					]
				}
            },
			{
                path: 'usermenu/sub/:Menu/:parent_id/:class/:icon/:parent/:extralink/:title/:id',
				component: SubMenuAgregarComponent,
				data: {
					title: 'Editar Opción Principal Menú',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Menu Usuario', url: '/usuario/usermainmenu'},
						{ title: 'SubMenu', url: '/usuario/usersubmenu'},
						{ title: 'Editar Menú' }
					]
				}
            },
			{
                path: 'userrolemenu',
				component: RolMenuComponent,
				data: {
					title: 'Roles Menu',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Usuarios' }
					]
				}
            },
			{
                path: 'adduserrolemenu',
				component: EditRolMenuComponent,
				data: {
					title: 'Roles Menu',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Roles Menu', url: '/usuario/userrolemenu'},
						{ title: 'Agregar Opción Menú' }
					]
				}
            },	
            {
                path: 'edituser/:id',
				component: EditComponent,
				data: {
					title: 'Editar Persona',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Usuarios', url: '/usuario'},
						{ title: 'Editar Usuario' }
					]
				}
            },
			{
                path: 'changepassword/:estado/:id/:rol',
				component: PasswordComponent,
				data: {
					title: 'Cambiar Contraseña',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Cambiar Contraseña' }
					]
				}
            },
        ]
    }          
]