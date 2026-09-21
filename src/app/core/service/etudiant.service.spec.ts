import { TestBed } from '@angular/core/testing';
import { EtudiantService } from './etudiant.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import {provideHttpClient} from '@angular/common/http';

describe('EtudiantService', () => {
  let service: EtudiantService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            provideHttpClient(),
            ]
    });
    service = TestBed.inject(EtudiantService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});