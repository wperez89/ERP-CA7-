import { Routes } from '@angular/router';
import { CreditoComponent } from './credito.component';
import { CreditNewComponent } from './credit-new/credit-new.component';
import { SolicitudListComponent } from './solicitud/solicitudList.component';
import { SolicitudCredComponent } from './solicitud-cred/solicitud-cred.component';



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
			{
                path: 'solicitudescred',
				component: SolicitudListComponent,
				data: {
					title: 'Solicitudes Crédito',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'SolicitudesCred', url: '/home' },
					]
				}
            },
			{
                path: 'solicitud/new',
				component: SolicitudCredComponent,
				data: {
					title: 'Nueva Solicitud Crédito',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'SolicitudesCred', url: '/credito/solicitudescred' },
						{ title: 'Nueva Solicitud' },
					]
				}
            },
			{
                path: 'solicitud/edit/:id/:estado/:cliente',
				component: SolicitudCredComponent,
				data: {
					title: 'Solicitud de Crédito',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'SolicitudesCred', url: '/credito/solicitudescred' },
						{ title: 'Nueva Solicitud' },
					]
				}
            },
        ]
    }          
]