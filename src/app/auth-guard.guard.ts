import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const router = inject(Router);

  if (!localStorage.getItem('token')) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}