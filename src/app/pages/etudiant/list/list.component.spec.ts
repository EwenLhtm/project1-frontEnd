import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { listComponent } from './list.component';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const etudiantServiceMock = {
    getEtudiants: jest.fn()
};

const routerMock = {
    navigate: jest.fn()
};

// Regroupement des tests lies a cette fonctionnalite.
describe('listComponent' , () => {
    let component: listComponent;
    let fixture: ComponentFixture<listComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

    // Preparation ou nettoyage du contexte commun a chaque test.
    beforeEach(async () => {
        etudiantServiceMock.getEtudiants.mockReset();
        routerMock.navigate.mockReset();

        etudiantServiceMock.getEtudiants.mockReturnValue(of([{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }]));

        await TestBed.configureTestingModule({
            imports: [listComponent],
            providers: [
                provideHttpClient(),
                { provide: EtudiantService, useValue: etudiantServiceMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(listComponent);
        component = fixture.componentInstance;
        etudiantService = TestBed.inject(EtudiantService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    // Verification du scenario et des assertions de ce test.
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('ngOnInit', () => {
        // Verification du scenario et des assertions de ce test.
        it('should fetch etudiants and assign to component', () => {
            const mockEtudiants = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }];
            etudiantServiceMock.getEtudiants.mockReturnValue(of(mockEtudiants));

            component.ngOnInit();

            expect(component.etudiants).toEqual(mockEtudiants);
        });
        // Verification du scenario et des assertions de ce test.
        it('should go to login page on error', () => {
            etudiantServiceMock.getEtudiants.mockReturnValue(throwError(() => new Error('Error fetching etudiants')));

            component.ngOnInit();

            expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
        });

    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('Router navigation methods', () => {
        // Verification du scenario et des assertions de ce test.
        it('should navigate to detail page', () => {
            const id = 1;
            component.detailEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/detail', id]);
        });
        // Verification du scenario et des assertions de ce test.
        it('should navigate to update page', () => {
            const id = 1;
            component.updateEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/update', id]);
        });
        // Verification du scenario et des assertions de ce test.
        it('should navigate to delete page', () => {
            const id = 1;
            component.deleteEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/delete', id]);
        });
        // Verification du scenario et des assertions de ce test.
        it('should navigate to create page', () => {
            component.createEtudiant();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/create']);
        });
    });
});
