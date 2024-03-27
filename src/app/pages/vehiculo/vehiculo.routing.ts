import { Routes } from '@angular/router';
import { VehiculoComponent } from './vehiculo.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FlotillaComponent } from './flotilla/flotilla.component';
import { ChoferComponent } from './chofer/chofer.component';
import { AprobadorComponent } from './aprobador/aprobador.component';
import { NewSolicitudComponent } from './solicitud/newsolicitud.component';
import { PasajeroComponent } from './solicitud/pasajero.component';
import { TransaccionComponent } from './solicitud/transaccion.component';


export const VehiculosRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'solicitud',
				pathMatch: 'full'
			},
			{
                path: 'lista',
				component: FlotillaComponent,
				data: {
					title: 'Lista de Vehiculos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Vehiculos' }
					]
				}
            },
			{
                path: 'solicitud',
				component: SolicitudComponent,
				data: {
					title: 'Lista de Solicitudes',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Solicitud de Vehiculos' }
					]
				}
            },
			{
                path: 'solicitud/new',
				component: NewSolicitudComponent,
				data: {
					title: 'Detalle de la Solicitud',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Lista Solicitudes', url: '/vehiculos/solicitud' },
						{ title: 'Nueva Solicitud de Vehiculos' }
					]
				}
            },
			{
                path: 'solicitud/pasajero/:num_sol/:estado/:cliente',
				component: PasajeroComponent,
				data: {
					title: 'Pasajeros de la Solicitud',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Lista Solicitudes', url: '/vehiculos/solicitud' },
						{ title: 'Pasajeros de Solicitud' }
					]
				}
            },
			{
                path: 'solicitud/edit/:num_sol/:estado/:id_solic',
				component: NewSolicitudComponent,
				data: {
					title: 'Detalle de la Solicitud',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Lista Solicitudes', url: '/vehiculos/solicitud' },
						{ title: 'Solicitud de Vehiculos Específica' }
					]
				}
            },
			{
                path: 'solicitud/transactions/:num_sol/:estado/:id_solic',
				component: TransaccionComponent,
				data: {
					title: 'Transacción de la Solicitud',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Lista Solicitudes', url: '/vehiculos/solicitud' },
						{ title: 'Transacción de Solicitud' }
					]
				}
            },
			{
                path: 'chofer',
				component: ChoferComponent,
				data: {
					title: 'Lista de Conductores',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Conductores Habilitados' }
					]
				}
            },
			{
                path: 'aprobador',
				component: AprobadorComponent,
				data: {
					title: 'Lista de Aprobadores',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Aprobadores Vehículo' }
					]
				}
            },
        ]
    }          
]