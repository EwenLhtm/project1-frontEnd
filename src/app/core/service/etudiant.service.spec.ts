import { TestBed } from '@angular/core/testing';
import { EtudiantService } from './etudiant.service';
import { expect, describe, it, beforeEach, afterEach } from '@jest/globals';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
    provideHttpClientTesting,
    HttpTestingController
} from '@angular/common/http/testing';


// Regroupement des tests lies a cette fonctionnalite.
describe('EtudiantService', () => {
  let service: EtudiantService;
  let httpMock: HttpTestingController;

    // Preparation ou nettoyage du contexte commun a chaque test.
    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            EtudiantService,
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting(),
            ]
    });

    service = TestBed.inject(EtudiantService);
    httpMock = TestBed.inject(HttpTestingController);
    });

    // Preparation ou nettoyage du contexte commun a chaque test.
    afterEach(() => {
        httpMock.verify();
    });

    // Verification du scenario et des assertions de ce test.
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('getEtudiants', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return an Observable<Etudiant[]>', () => {
            const mockResponse: any[] = [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Smith' }
            ];

            service.getEtudiants().subscribe((res) => {
                expect(res).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('/api/etudiant');

            expect(req.request.method).toBe('GET');

            expect(req.request.headers.get('Authorization')).toBe(`Bearer ${localStorage.getItem('token')}`);

            req.flush(mockResponse);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('getEtudiantById', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return an Observable<Etudiant>', () => {
            const mockResponse: any = { id: 1, name: 'John Doe' };

            service.getEtudiantById(1).subscribe((res) => {
                expect(res).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('/api/etudiant/1');

            expect(req.request.method).toBe('GET');

            expect(req.request.headers.get('Authorization')).toBe(`Bearer ${localStorage.getItem('token')}`);

            req.flush(mockResponse);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('createEtudiant', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return an Observable<Object> when creating an etudiant', () => {
            const mockResponse = {
                message: 'Etudiant created successfully'
            };

            service
                .createEtudiant({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com'
                })
                .subscribe((res) => {
                    expect(res).toEqual(mockResponse);
                });

            const req = httpMock.expectOne('/api/etudiant');

            expect(req.request.method).toBe('POST');

            expect(req.request.body).toEqual({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com'
            });

            req.flush(mockResponse);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('updateEtudiant', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return an Observable<Object> when updating an etudiant', () => {
            const mockResponse = {
                message: 'Etudiant updated successfully'
            };

            service
                .updateEtudiant(1, {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@gmail.com'
                })
                .subscribe((res) => {
                    expect(res).toEqual(mockResponse);
                });

            const req = httpMock.expectOne('/api/etudiant/1');

            expect(req.request.method).toBe('PUT');

            expect(req.request.body).toEqual({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com'
            });

            req.flush(mockResponse);
        });
    });

    // Regroupement des tests lies a cette fonctionnalite.
    describe('deleteEtudiant', () => {
        // Verification du scenario et des assertions de ce test.
        it('should return an Observable<Object> when deleting an etudiant', () => {
            const mockResponse = {
                message: 'Etudiant deleted successfully'
            };

            service.deleteEtudiant(1).subscribe((res) => {
                expect(res).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('/api/etudiant/1');

            expect(req.request.method).toBe('DELETE');

            req.flush(mockResponse);
        });
    });
});
