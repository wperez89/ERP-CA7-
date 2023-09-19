import { Routes } from '@angular/router';
import { PeriodoComponent } from './tablas/periodo/periodo.component';
import { beneficios } from 'src/app/models/cebs/tablas.models';
import { BeneficiosComponent } from './tablas/beneficios/beneficios.component';
import { AprobadoresComponent } from './tablas/aprobadores/aprobadores.component';
import { ListasubsidiosComponent } from './subsidios/listasubsidios/listasubsidios.component';
import { NewsubsidioComponent } from './subsidios/newsubsidio/newsubsidio.component';
import { EditsubsidioComponent } from './subsidios/editsubsidio/editsubsidio.component';
import { AprobadoComponent } from './aprobado/aprobado.component';
import { PagadoComponent } from './pagado/pagado.component';




export const cebsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'avaluo',
				pathMatch: 'full'
			},
            {
                path: 'settings/periodo',
				component: PeriodoComponent,
				data: {
					title: 'Periodos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Periodos' }
					]
				}
            },
			{
                path: 'settings/beneficios',
				component: BeneficiosComponent,
				data: {
					title: 'Beneficios',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Beneficios' }
					]
				}
            },
			{
                path: 'settings/aprobadores',
				component: AprobadoresComponent,
				data: {
					title: 'Aprobadores',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Aprobadores' }
					]
				}
            },
			{
                path: 'subsidios',
				component: ListasubsidiosComponent,
				data: {
					title: 'Subsidios Médicos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Subsidios Médicos' }
					]
				}
            },
			{
                path: 'subsidios/new',
				component: NewsubsidioComponent,
				data: {
					title: 'Subsidios Médicos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Subsidios Médicos', url: '/cebs/subsidios' },
						{ title: 'Nuevo Subsidio' }
					]
				}
            },
			{
                path: 'subsidios/edit/:persona/:periodo/:estado/:id',
				component: NewsubsidioComponent,
				data: {
					title: 'Subsidios Médicos',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Subsidios Médicos', url: '/cebs/subsidios' },
						{ title: 'Editar Subsidio' }
					]
				}
            },
			{
                path: 'aprobacion/:persona/:periodo/:estado/:id/:aprobado',
				component: AprobadoComponent,
				data: {
					title: 'Aprobación Subsidio',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Subsidios Médicos', url: '/cebs/subsidios' },
						{ title: 'Aprobación Subsidio' }
					]
				}
            },
			{
                path: 'pagado/:persona/:periodo/:estado/:id/:pagado',
				component: PagadoComponent,
				data: {
					title: 'Liquidar Subsidio',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Subsidios Médicos', url: '/cebs/subsidios' },
						{ title: 'Liquidar Subsidio' }
					]
				}
            },
        ]
    }          
]