import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { expect, describe, it, beforeEach, afterEach } from '@jest/globals';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
      it('should return an Observable<Object> when registration is successful', () => {
        const mockResponse = {
          message: 'Registration successful',
        };

        service
          .register({
            firstName: 'test',
            lastName: 'test',
            login: 'test',
            password: 'test',
          })
          .subscribe((res) => {
            expect(res).toEqual(mockResponse);
          });

        const req = httpMock.expectOne('/api/register');

        expect(req.request.method).toBe('POST');

        expect(req.request.body).toEqual({
          firstName: 'test',
          lastName: 'test',
          login: 'test',
          password: 'test',
        });

        req.flush(mockResponse);
      });
  });

  describe('login', () => {
      it('should return an Observable<Object> when login is successful', () => {
        const mockResponse = {
          message: 'Login successful',
        };

        service
          .login({
            login: 'test',
            password: 'test',
          })
          .subscribe((res) => {
            expect(res).toEqual(mockResponse);
          });

        const req = httpMock.expectOne('/api/login');

        expect(req.request.method).toBe('POST');

        expect(req.request.body).toEqual({
          login: 'test',
          password: 'test',
        });

        req.flush(mockResponse);
      });
  });
});
