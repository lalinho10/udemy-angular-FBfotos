import { Route, RouterModule } from '@angular/router';

import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

const APP_ROUTES: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'fotos', component: FotosComponent },
    { path: 'carga', component: CargaComponent },
    { path: '**', redirectTo: 'fotos' }
];

export const APP_ROUTING = RouterModule.forRoot( APP_ROUTES );
