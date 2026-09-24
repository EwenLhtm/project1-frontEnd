import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuard', () => {
  let router: jest.Mocked<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

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

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when a token exists', () => {
    localStorage.setItem('token', 'test-token');

    const result = executeGuard(
      {} as any,
      {} as any
    );

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to login when no token exists', () => {
    const result = executeGuard(
      {} as any,
      {} as any
    );

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});