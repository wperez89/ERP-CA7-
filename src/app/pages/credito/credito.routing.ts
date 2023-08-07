import { Routes } from '@angular/router';
import { CreditoComponent } from './credito.component';
import { CreditNewComponent } from './credit-new/credit-new.component';



export const CreditoRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'credito',
				pathMatch: 'full'
			},
            {
                path: '',
				component: CreditoComponent,
				data: {
					title: 'Listado de Personas',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Listado de Personas' }
					]
				}
            },
			{
                path: 'new/:id',
				component: CreditNewComponent,
				data: {
					title: 'Nuevo Crédito',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Créditos', url: '/credito' },
						{ title: 'Nuevo Crédito' }
					]
				}
            },
        ]
    }          
]