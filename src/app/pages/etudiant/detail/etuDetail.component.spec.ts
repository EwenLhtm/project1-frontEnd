import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EtuDetailComponent } from './etuDetail.component';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

const etudiantServiceMock = {
    getEtudiantById: jest.fn(),
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

describe('EtuDetailComponent', () => {
    let component: EtuDetailComponent;
    let fixture: ComponentFixture<EtuDetailComponent>;
    let etudiantService: EtudiantService;
    let router: Router;

    beforeEach(async () => {
        etudiantServiceMock.getEtudiantById.mockReset();
        routerMock.navigate.mockReset();

        await TestBed.configureTestingModule({
            imports: [EtuDetailComponent],
            providers: [
                provideHttpClient(),
                { provide: EtudiantService, useValue: etudiantServiceMock },
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: Router, useValue: routerMock },
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EtuDetailComponent);
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
            const mockEtudiant = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
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

    describe('goBack', () => {
        it('should navigate back to etudiant list', () => {
            component.goBack();
            expect(routerMock.navigate).toHaveBeenCalledWith(['/etudiant']);
        });
    });
});