import { Routes } from '@angular/router';
import { PersonaNuevaComponent } from './persona-nueva/persona-nueva.component';
import { PersonaeditComponent } from './personaedit/personaedit.component';
import { PersonasComponent } from './personas.component';
import { ProfesionalComponent } from './profesional/profesional.component';


export const PersonasRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'persona',
				pathMatch: 'full'
			},
            {
                path: 'persona',
				component: PersonasComponent,
				data: {
					title: 'Personas',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Personas' }
					]
				}
            },
			{
                path: 'newperson',
				component: PersonaNuevaComponent,
				data: {
					title: 'Nueva Persona',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Personas', url: '/persona'},
						{ title: 'Nueva Persona' }
					]
				}
            },
            {
                path: 'editperson/:tipo/:id',
				component: PersonaeditComponent,
				data: {
					title: 'Editar Persona',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Personas', url: '/persona'},
						{ title: 'Editar Persona' }
					]
				}
            },
			{
                path: 'professional',
				component: ProfesionalComponent,
				data: {
					title: 'Profesionales',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Personas', url: '/persona'},
						{ title: 'Profesionales' }
					]
				}
            },
        ]
    }          
]