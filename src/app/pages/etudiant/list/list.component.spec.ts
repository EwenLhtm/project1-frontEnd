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

describe('listComponent' , () => {
    let component: listComponent;
    let fixture: ComponentFixture<listComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should fetch etudiants and assign to component', () => {
            const mockEtudiants = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }];
            etudiantServiceMock.getEtudiants.mockReturnValue(of(mockEtudiants));

            component.ngOnInit();

            expect(component.etudiants).toEqual(mockEtudiants);
        });
        it('should go to login page on error', () => {
            etudiantServiceMock.getEtudiants.mockReturnValue(throwError(() => new Error('Error fetching etudiants')));

            component.ngOnInit();

            expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
        });

    });
    
    describe('Router navigation methods', () => {
        it('should navigate to detail page', () => {
            const id = 1;
            component.detailEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/detail', id]);
        });
        it('should navigate to update page', () => {
            const id = 1;
            component.updateEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/update', id]);
        });
        it('should navigate to delete page', () => {
            const id = 1;
            component.deleteEtudiant(id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/delete', id]);
        });
        it('should navigate to create page', () => {
            component.createEtudiant();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant/create']);
        });
    });
});