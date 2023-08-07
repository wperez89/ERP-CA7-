import { Routes } from '@angular/router';
import { ArchivoDigitalComponent } from './archivo-digital.component';
import { AgregarDocComponent } from './agregar-doc/agregar-doc.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { AreaDocumentoComponent } from './area-documento/area-documento.component';

export const ArchivoDigitalRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path:'',
				redirectTo:'archivo-digital',
				pathMatch: 'full'
			},
            {
                path: '',
				component: ArchivoDigitalComponent,
				data: {
					title: 'Archivo Digital',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Archivo Digital',url:'/archivo-digital' }
					]
				}
            },
			{
                path: 'addDocument',
				component: AgregarDocComponent,
				data: {
					title: 'Agregar Documento',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Archivo Digital',url:'/archivo-digital' }
					]
				}
            },
			{
                path: 'mantenimiento/TipoDocumentos',
				component: TipoDocumentoComponent,
				data: {
					title: 'Tipos de Documento',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Archivo Digital',url:'/archivo-digital' },
						{ title: 'Tipo Documento', }
					]
				}
            },
			{
                path: 'mantenimiento/AreaDocumental',
				component: AreaDocumentoComponent,
				data: {
					title: 'Área Documental',
					urls: [
						{ title: 'Home', url: '/home' },
						{ title: 'Archivo Digital',url:'/archivo-digital' },
						{ title: 'Area Documental', }
					]
				}
            },
			
        ]
    }          
]