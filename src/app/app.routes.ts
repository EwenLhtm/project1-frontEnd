import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
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
    component: listComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'etudiant/detail/:id',
    component: EtuDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'etudiant/create',
    component: EtuCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'etudiant/update/:id',
    component: EtuUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'etudiant/delete/:id',
    component: EtuDeleteComponent,
    canActivate: [AuthGuard]
  }

];
