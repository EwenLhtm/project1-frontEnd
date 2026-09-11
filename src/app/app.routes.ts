import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {listComponent} from './pages/etudiant/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'etudiant',
    component: listComponent
  }

];
