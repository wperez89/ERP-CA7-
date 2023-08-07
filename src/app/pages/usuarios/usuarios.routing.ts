import { Routes } from '@angular/router';
import { NuevoComponent } from './nuevo/nuevo.component';
import { UsuariosComponent } from './usuarios.component';
import { EditComponent } from './edit/edit.component';
import { PasswordComponent } from './password/password.component';

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
                path: 'usuario',
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