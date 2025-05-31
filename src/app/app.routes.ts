import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OtrLayoutComponent } from './layout/otr-layout/otr-layout.component';

export const routes: Routes = [
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path: '',
        component: OtrLayoutComponent,
        canActivate: [authGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)}
        ]
    }
];
