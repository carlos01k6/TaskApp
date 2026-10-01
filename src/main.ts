import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { AppComponent } from './app/app.component';

const rutas: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./app/home/home.page').then((modulo) => modulo.HomePage),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(rutas),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch((error: unknown) => console.error(error));
