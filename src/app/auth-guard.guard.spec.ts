import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth-guard.guard';

// Regroupement des tests lies a cette fonctionnalite.
describe('AuthGuard', () => {
  let router: jest.Mocked<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  // Preparation ou nettoyage du contexte commun a chaque test.
  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: router,
        },
      ],
    });

    localStorage.clear();
  });

  // Preparation ou nettoyage du contexte commun a chaque test.
  afterEach(() => {
    localStorage.clear();
  });

  // Verification du scenario et des assertions de ce test.
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  // Verification du scenario et des assertions de ce test.
  it('should return true when a token exists', () => {
    localStorage.setItem('token', 'test-token');

    const result = executeGuard(
      {} as any,
      {} as any
    );

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // Verification du scenario et des assertions de ce test.
  it('should return false and navigate to login when no token exists', () => {
    const result = executeGuard(
      {} as any,
      {} as any
    );

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
