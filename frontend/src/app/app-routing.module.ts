import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirect root to /home
  { path: 'home', loadChildren: () => import('./components/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] }  // Add this line for the admin dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
