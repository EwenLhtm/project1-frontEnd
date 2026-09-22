import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EtuCreateComponent } from './etuCreate.component';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const etudiantServiceMock = {
    createEtudiant: jest.fn(),
};
const routerMock = {
    navigate: jest.fn(),
};

describe('EtuCreateComponent', () => {
    let component: EtuCreateComponent;
    let fixture: ComponentFixture<EtuCreateComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

    beforeEach(async () => {
        etudiantServiceMock.createEtudiant.mockReset();
        routerMock.navigate.mockReset();

        await TestBed.configureTestingModule({
            imports: [EtuCreateComponent],
            providers: [
                provideHttpClient(),
                { provide: EtudiantService, useValue: etudiantServiceMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EtuCreateComponent);
        component = fixture.componentInstance;
        etudiantService = TestBed.inject(EtudiantService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call etudiantService.createEtudiant when form is valid', () => {
        etudiantServiceMock.createEtudiant.mockReturnValue(of(null));

        component.createForm.patchValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com'
        });
        component.onSubmit();

        expect(etudiantServiceMock.createEtudiant).toHaveBeenCalled();
    });

    describe('onIgnit', () => {
        it('should create form with required validators', () => {
            expect(component.createForm).toBeDefined();
            expect(component.createForm.get('firstName')?.validator).toBeDefined();
            expect(component.createForm.get('lastName')?.validator).toBeDefined();
            expect(component.createForm.get('email')?.validator).toBeDefined();

            const form = component.createForm;
            form.controls['firstName'].setValue('');
            form.controls['lastName'].setValue('');
            form.controls['email'].setValue('');

            expect(form.valid).toBe(false);
            expect(form.controls['firstName'].hasError('required')).toBe(true);
            expect(form.controls['lastName'].hasError('required')).toBe(true);
            expect(form.controls['email'].hasError('required')).toBe(true);
        });
    });

    describe('form getter', () => {
        it('should return form controls', () => {
            const controls = component.form;
            expect(controls).toBe(component.createForm.controls);
        });
    });

    describe('onSubmit', () => {
        it('should set submitted to true', () => {
            component.onSubmit();
            expect(component.submitted).toBe(true);
        });

        it('should not call register if form is invalid', () => {
            component.createForm.patchValue({
                firstName: '',
                lastName: '',
                email: ''
            });
            component.onSubmit();
            expect(etudiantServiceMock.createEtudiant).not.toHaveBeenCalled();
        });

        it('should call etudiantService.createEtudiant when form is valid', () => {
            component.createForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            etudiantServiceMock.createEtudiant.mockReturnValue(of(null));

            component.onSubmit();

            expect(etudiantServiceMock.createEtudiant).toHaveBeenCalledWith({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });
        });

        it('should navigate to /etudiant on success', () => {
            etudiantServiceMock.createEtudiant.mockReturnValue(of(null));

            component.createForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            component.onSubmit();

            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });

        it('should NOT navigate on error', () => {
            etudiantServiceMock.createEtudiant.mockReturnValue(throwError(() => new Error('Error')));

            component.createForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            component.onSubmit();

            expect(routerMock.navigate).not.toHaveBeenCalled();
        });
    });

    describe('onReset', () => {
        it('should reset the form and set submitted to false', () => {
            component.submitted = true;
            component.createForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });
            component.onReset();

            expect(component.submitted).toBe(false);
            expect(component.createForm.value).toEqual({
                firstName: null,
                lastName: null,
                email: null
            });
        });
    });

    describe('Validation scenarios', () => {
        it('should be invalid when only firstName is provided', () => {
            component.createForm.patchValue({
                firstName: 'John',
                lastName: '',
                email: ''
            });
            expect(component.createForm.valid).toBe(false);
        });

        it('should be valid when all fields are filled', () => {
            component.createForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });
            expect(component.createForm.valid).toBe(true);
        });
    });
});