/**
 * Created By : Milind Ahuja 
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


// Parent Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: homeChildRoutes,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/**
 * Created By : Milind Ahuja 
 */
