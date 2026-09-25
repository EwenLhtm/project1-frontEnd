import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { UserService } from '../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const userServiceMock = {
    login: jest.fn(),
};

const routerMock = {
    navigate: jest.fn(),
};

// Regroupement des tests lies a cette fonctionnalite.
describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: UserService;
    let router: Router;

    // Preparation ou nettoyage du contexte commun a chaque test.
    beforeEach(async () => {
        userServiceMock.login.mockReset();
        routerMock.navigate.mockReset();

        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                provideHttpClient(),
                { provide: UserService, useValue: userServiceMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    // Verification du scenario et des assertions de ce test.
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Verification du scenario et des assertions de ce test.
    it('should call userService.login when form is valid', () => {
        userServiceMock.login.mockReturnValue(of(null));

        component.loginForm.patchValue({
            login: 'johndoe',
            password: 'password123'
        });
        component.onSubmit();

        expect(userServiceMock.login).toHaveBeenCalled();
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('ngOnInit', () => {
        // Verification du scenario et des assertions de ce test.
        it('should create form with required validators', () => {
            expect(component.loginForm).toBeDefined();
            expect(component.loginForm.controls['login']).toBeDefined();
            expect(component.loginForm.controls['password']).toBeDefined();

            const form = component.loginForm;
            form.controls['login'].setValue('');
            form.controls['password'].setValue('');

            expect(form.valid).toBe(false);
            expect(form.controls['login'].hasError('required')).toBe(true);
            expect(form.controls['password'].hasError('required')).toBe(true);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('form getter', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return the form controls', () => {
            const controls = component.form;
            expect(controls).toBe(component.loginForm.controls);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('onSubmit', () => {
        // Verification du scenario et des assertions de ce test.
        it('should be sumbitted to true', () => {
            component.onSubmit();
            expect(component.submitted).toBe(true);
        });

        // Verification du scenario et des assertions de ce test.
        it('should not call login if form is invalid', () => {
            component.onSubmit();
            expect(userServiceMock.login).not.toHaveBeenCalled();
        });

        // Verification du scenario et des assertions de ce test.
        it('should call login when form is valid', () => {
            component.loginForm.patchValue({
                login: 'johndoe',
                password: 'password123'
            });

            userServiceMock.login.mockReturnValue(of({ token: 'fake-jwt-token' }));

            component.onSubmit();

            expect(userServiceMock.login).toHaveBeenCalledWith({
                login: 'johndoe',
                password: 'password123'
            });
        });

        // Verification du scenario et des assertions de ce test.
        it('should navigate to home on successful login', () => {
            userServiceMock.login.mockReturnValue(of({ token: 'fake-jwt-token' }));

            component.loginForm.patchValue({
                login: 'johndoe',
                password: 'password123'
            });

            component.onSubmit();

            expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
        });

        // Verification du scenario et des assertions de ce test.
        it('should NOT navigate on error', () => {
            userServiceMock.login.mockReturnValue(
                throwError(() => new Error('Login failed'))
            );

            component.loginForm.patchValue({});

            component.onSubmit();

            expect(routerMock.navigate).not.toHaveBeenCalled();
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('onReset', () => {
        // Verification du scenario et des assertions de ce test.
        it('should reset form and set submitted to false', () => {
            component.submitted = true;
            component.loginForm.patchValue({
                login: 'testuser',
                password: 'testpass'
            });

            component.onReset();

            expect(component.submitted).toBe(false);
            expect(component.loginForm.value).toEqual({
                login: null,
                password: null
            });
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('Validation scenarios', () => {
        // Verification du scenario et des assertions de ce test.
        it('should be invalid when login is empty', () => {
            component.loginForm.patchValue({
                login: '',
                password: 'password123'
            });
            expect(component.loginForm.valid).toBe(false);
        });

        // Verification du scenario et des assertions de ce test.
        it('should be invalid when password is empty', () => {
            component.loginForm.patchValue({
                login: 'johndoe',
                password: ''
            });
            expect(component.loginForm.valid).toBe(false);
        });

        // Verification du scenario et des assertions de ce test.
        it('should be valid when all fields are filled', () => {
            component.loginForm.patchValue({
                login: 'johndoe',
                password: 'password123'
            });
            expect(component.loginForm.valid).toBe(true);
        });
    });
});
