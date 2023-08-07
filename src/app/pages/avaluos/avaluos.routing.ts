import { Routes } from '@angular/router';
import { AvaluosComponent } from './avaluos.component';
import { AvaluonewComponent } from './avaluonew/avaluonew.component';
import { AvaluoeditComponent } from './avaluoedit/avaluoedit.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { FacturaComponent } from './factura/factura.component';
import { RepCotizacionesComponent } from './reportes/rep-cotizaciones/rep-cotizaciones.component';



export const AvaluosRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'avaluo',
				pathMatch: 'full'
			},
            {
                path: '',
				component: AvaluosComponent,
				data: {
					title: 'Avaluos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Avaluos' }
					]
				}
            },
			{
                path: 'new/:id',
				component: AvaluonewComponent,
				data: {
					title: 'Nuevo Avaluo',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Avaluos', url: '/avaluo'},
						{ title: 'Nuevo Avaluo' }
					]
				}
            },
            {
                path: 'edit/:id',
				component: AvaluoeditComponent,
				data: {
					title: 'Editar Persona',
					urls: [
						{ title: 'Home', url: '/home'},
						{ title: 'Avaluos', url: '/avaluo'},
						{ title: 'Editar Avaluo' }
					]
				}
            },
			{
                path: 'cotizacion/:id',
				component: CotizacionComponent,
				data: {
					title: 'Cotización Avalúo',
					urls: [
						{ title: 'Home', url: '/home'},
						{ title: 'Avaluos', url: '/avaluo'},
						{ title: 'Cotización Avaluo' }
					]
				}
            },
			{
                path: 'factura/:id',
				component: FacturaComponent,
				data: {
					title: 'Factura Avalúo',
					urls: [
						{ title: 'Home', url: '/home'},
						{ title: 'Avaluos', url: '/avaluo'},
						{ title: 'Factura Avaluo' }
					]
				}
            },
			{
                path: 'report/profesionales',
				component: RepCotizacionesComponent,
				data: {
					title: 'Reportes de Profesionales',
					urls: [
						{ title: 'Home', url: '/home'},
						{ title: 'Avaluos', url: '/avaluo'},
						{ title: 'Reporte Profesionales' }
					]
				}
            }
        ]
    }          
]