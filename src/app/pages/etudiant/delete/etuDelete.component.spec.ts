import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EtuDeleteComponent } from './etuDelete.component';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const etudiantServiceMock = {
    getEtudiantById: jest.fn(),
    deleteEtudiant: jest.fn(),
};
const routerMock = {
    navigate: jest.fn(),
};
const routeMock = {
  params: of({
    id: '1'
  })
};

describe('EtuDeleteComponent', () => {
    let component: EtuDeleteComponent;
    let fixture: ComponentFixture<EtuDeleteComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

    beforeEach(async () => {
        etudiantServiceMock.getEtudiantById.mockReset();
        etudiantServiceMock.deleteEtudiant.mockReset();
        routerMock.navigate.mockReset();

        await TestBed.configureTestingModule({
            imports: [EtuDeleteComponent],
            providers: [
                provideHttpClient(),
                { provide: EtudiantService, useValue: etudiantServiceMock },
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EtuDeleteComponent);
        component = fixture.componentInstance;
        etudiantService = TestBed.inject(EtudiantService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should fetch etudiant by id and set it to component', () => {
            const mockEtudiant = { id: 1, name: 'John Doe' };
            etudiantServiceMock.getEtudiantById.mockReturnValue(of(mockEtudiant));
            component.ngOnInit();
            expect(component.etudiant).toEqual(mockEtudiant);
        });
        it('should navigate to /etudiant on error', () => {
            etudiantServiceMock.getEtudiantById.mockReturnValue(throwError(() => new Error('Error')));
            component.ngOnInit();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });
    });

    describe('deleteEtudiant', () => {
        it('should call deleteEtudiant and navigate to /etudiant on success', () => {
            const mockEtudiant = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
            component.etudiant = mockEtudiant;
            etudiantServiceMock.deleteEtudiant.mockReturnValue(of(null));
            component.deleteEtudiant();
            expect(etudiantServiceMock.deleteEtudiant).toHaveBeenCalledWith(mockEtudiant.id);
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });
    });

    describe('goBack', () => {
        it('should navigate back to etudiant list', () => {
            component.goBack();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });
    });

});

