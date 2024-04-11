import { Routes } from '@angular/router';
import { AsambleaMantComponent } from './asamblea-mant/asamblea-mant.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistentesComponent } from './asistentes/asistentes.component';
import { ParticipacionComponent } from './participacion/participacion.component';
import { AsambleaComponent } from './asamblea.component';
import { DelegadosComponent } from './delegados/delegados.component';


export const AsambleaRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'asamblea',
				pathMatch: 'full'
			},
			{
                path: '',
				component: AsambleaComponent,
				data: {
					title: 'Informacion Asamblea',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Info Asamblea',url:'/asamblea' }
					]
				}
            },
			{
                path: 'mantenimiento/delegado',
				component: DelegadosComponent,
				data: {
					title: 'Informacion Delegados',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Asambleas',url:'/asamblea' },
						{ title: 'Delegados Activos',url:'/asamblea/delegado' }
					]
				}
            },
            {
                path: 'mantenimiento/tblasamblea',
				component: AsambleaMantComponent,
				data: {
					title: 'Mantenimiento Asamblea',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Asambleas',url:'/asamblea' }
					]
				}
            },
			{
				path: 'asistente',
				component: AsistentesComponent,
				data: {
					title: 'Registrar Delegado',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Asambleas',url:'/asamblea' },
						{ title: 'Delegados Asistente',url:'/asamblea' }
					]
				}
            },
			{
				path: 'listasistencia',
				component: AsistenciaComponent,
				data: {
					title: 'Lista Delegado Asistente',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Asambleas',url:'/asamblea' },
						{ title: 'Asistencia Delegado',url:'/asamblea' }
					]
				}
            },
			{
				path: 'participacion',
				component: ParticipacionComponent,
				data: {
					title: 'Participación Asamblea',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Asamblea',url:'/asamblea' },
						{ title: 'Participación Asamblea', }
					]
				}
            },
        ]
    }          
]