import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EtuUpdateComponent } from './etuUpdate.component';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const etudiantServiceMock = {
    getEtudiantById: jest.fn(),
    updateEtudiant: jest.fn(),
};
const routerMock = {
    navigate: jest.fn(),
};
const routeMock = {
    paramMap: of({
        get: (key: string) => {
            if (key === 'id') {
                return '1';
            }
            return null;
        }
    })
};

describe('EtuUpdateComponent', () => {
    let component: EtuUpdateComponent;
    let fixture: ComponentFixture<EtuUpdateComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

    beforeEach(async () => {
        etudiantServiceMock.getEtudiantById.mockReset();
        etudiantServiceMock.updateEtudiant.mockReset();
        routerMock.navigate.mockReset();

        etudiantServiceMock.getEtudiantById.mockReturnValue(of({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com'
        }));

        await TestBed.configureTestingModule({
            imports: [EtuUpdateComponent],
            providers: [
                provideHttpClient(),
                { provide: EtudiantService, useValue: etudiantServiceMock },
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EtuUpdateComponent);
        component = fixture.componentInstance;
        etudiantService = TestBed.inject(EtudiantService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should create form with etudiant data when etudiant is fetched successfully', () => {
            const mockEtudiant = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com' };
            etudiantServiceMock.getEtudiantById.mockReturnValue(of(mockEtudiant));
            component.ngOnInit();
            expect(component.updateForm).toBeDefined();
            expect(component.updateForm.get('firstName')).toBeDefined();
            expect(component.updateForm.get('lastName')).toBeDefined();
            expect(component.updateForm.get('email')).toBeDefined();

            const form = component.updateForm;
            expect(form.get('firstName')?.value).toEqual(mockEtudiant.firstName);
            expect(form.get('lastName')?.value).toEqual(mockEtudiant.lastName);
            expect(form.get('email')?.value).toEqual(mockEtudiant.email);

            expect(form.valid).toBe(true);
            expect(form.controls['firstName'].hasError('required')).toBe(false);
            expect(form.controls['lastName'].hasError('required')).toBe(false);
            expect(form.controls['email'].hasError('required')).toBe(false);
            expect(form.controls['email'].hasError('email')).toBe(false);
        });
    });

    describe('form getter', () => {
        it('should return from controls', () => {
            const controls = component.form;
            expect(controls).toBe(component.updateForm.controls);
        });
    });

    describe('onSubmit', () => {
        it('should set submitted to true', () => {
            etudiantServiceMock.updateEtudiant.mockReturnValue(of({}));
            component.onSubmit();
            expect(component.submitted).toBe(true);
        });

        it('should not call register if form is invalid', () => {
            component.updateForm.patchValue({
                firstName: '',
                lastName: '',
                email: ''
            });
            component.onSubmit();
            expect(etudiantServiceMock.updateEtudiant).not.toHaveBeenCalled();
        });

        it('should call updateEtudiant when form is valid', () => {
            component.updateForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            etudiantServiceMock.updateEtudiant.mockReturnValue(of(null));

            component.onSubmit();

            expect(etudiantServiceMock.updateEtudiant).toHaveBeenCalledWith(
            1,
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            }
            );
        });

        it('should navigate to /etudiant on successful update', () => {
            etudiantServiceMock.updateEtudiant.mockReturnValue(of(null));

            component.updateForm.patchValue({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            component.onSubmit();

            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });

        it('should NOT navigate on error', () => {
            etudiantServiceMock.updateEtudiant.mockReturnValue(throwError(() => new Error('Error')));

            component.updateForm.patchValue({});

            component.onSubmit();

            expect(routerMock.navigate).not.toHaveBeenCalled();
        });
    });

    describe('goBack', () => {
        it('should navigate back to etudiant list', () => {
            component.goBack();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });
    });
});