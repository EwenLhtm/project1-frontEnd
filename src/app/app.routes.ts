import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {listComponent} from './pages/etudiant/list/list.component';
import {EtuDetailComponent} from './pages/etudiant/detail/etuDetail.component';
import {EtuCreateComponent} from './pages/etudiant/create/etuCreate.component';
import {EtuUpdateComponent} from './pages/etudiant/update/etuUpdate.component';
import {EtuDeleteComponent} from './pages/etudiant/delete/etuDelete.component';

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
  },
  {
    path: 'etudiant/detail/:id',
    component: EtuDetailComponent
  },
  {
    path: 'etudiant/create',
    component: EtuCreateComponent
  },
  {
    path: 'etudiant/update/:id',
    component: EtuUpdateComponent
  },
  {
    path: 'etudiant/delete/:id',
    component: EtuDeleteComponent
  }

];
