import { Routes } from '@angular/router';
import { CuponesComponent } from './rifas/cupones/cupones.component';
import { DatosCuponComponent } from './rifas/datos-cupon/datos-cupon.component';




export const MarchamoRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'marchamo',
				pathMatch: 'full'
			},
			{
                path: 'listcupon',
				component: CuponesComponent,
				data: {
					title: 'Lista de Cupones',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Listado de Cupones' }
					]
				}
            },
			{
                path: 'datosCupon/:estado/:id/:placa',
				component: DatosCuponComponent,
				data: {
					title: 'Datos Cupon',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Cupones', url: '/marchamo/listcupon' },
						{ title: 'Datos Cupon' }
					]
				}
            },
        ]
    }          
]