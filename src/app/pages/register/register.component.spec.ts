import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { UserService } from '../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const userServiceMock = {
  register: jest.fn(),
};

const routerMock = {
  navigate: jest.fn(),
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    userServiceMock.register.mockReset();
    routerMock.navigate.mockReset();

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.register when form is valid', () => {
    userServiceMock.register.mockReturnValue(of(null));

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'johndoe',
      password: 'password123',
    });
    component.onSubmit();

    expect(userServiceMock.register).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('should create form with required validators', () => {
      expect(component.registerForm).toBeDefined();
      expect(component.registerForm.controls['firstName']).toBeDefined();
      expect(component.registerForm.controls['lastName']).toBeDefined();
      expect(component.registerForm.controls['login']).toBeDefined();
      expect(component.registerForm.controls['password']).toBeDefined();

      const form = component.registerForm;;
      form.controls['firstName'].setValue('');
      form.controls['lastName'].setValue('');
      form.controls['login'].setValue('');
      form.controls['password'].setValue('');

      expect(form.valid).toBe(false);
      expect(form.controls['firstName'].hasError('required')).toBe(true);
      expect(form.controls['lastName'].hasError('required')).toBe(true);
      expect(form.controls['login'].hasError('required')).toBe(true);
      expect(form.controls['password'].hasError('required')).toBe(true);
    });
  });

  describe('form getter', () => {
    it('should return form controls', () => {
      const controls = component.form;
      expect(controls).toEqual(component.registerForm.controls);
    });
  });

  describe('onSubmit', () => {
    it('should set submitted to true', () => {
      component.onSubmit();
      expect(component.submitted).toBe(true);
    });

    it('should not call register if form is invalid', () => {
      component.onSubmit();
      expect(userServiceMock.register).not.toHaveBeenCalled();
    });

    it('should call userService.register when form is valid', () => {
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });

      userServiceMock.register.mockReturnValue(of(null));

      component.onSubmit();

      expect(userServiceMock.register).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });
    });

    it('should navigate to /login on success', () => {
      userServiceMock.register.mockReturnValue(of(null));

      component.registerForm.patchValue({
        firstName: 'Jane',
        lastName: 'Smith',
        login: 'janesmith',
        password: 'securepass',
      });

      component.onSubmit();

      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should show alert on success', (done) => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      component.registerForm.patchValue({
        firstName: 'Test',
        lastName: 'User',
        login: 'testuser',
        password: 'testpass',
      });

      userServiceMock.register.mockReturnValue(of(null));
      component.onSubmit();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
          done();
        });
      });
    });

    it('should NOT navigate on error', () => {
      userServiceMock.register.mockReturnValue(
        throwError(() => new Error('API Error'))
      );

      component.registerForm.patchValue({});

      component.onSubmit();

      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('onReset', () => {
    it('should reset form and set submitted to false', () => {
      component.submitted = true;
      component.registerForm.patchValue({
        firstName: 'Test',
        lastName: 'User',
        login: 'testuser',
        password: 'testpass',
      });

      component.onReset();

      expect(component.submitted).toBe(false);
      expect(component.registerForm.value).toEqual({
        firstName: null,
        lastName: null,
        login: null,
        password: null,
      });
    });
  });

  describe('Validation scenarios', () => {
    it('should be invalid when only firstName is filled', () => {
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: '',
        login: '',
        password: '',
      });

      expect(component.registerForm.valid).toBe(false);
    });

    it('should be valid when all fields are filled', () => {
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });

      expect(component.registerForm.valid).toBe(true);
    });
  });
});
