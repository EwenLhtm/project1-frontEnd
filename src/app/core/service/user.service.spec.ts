import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import {provideHttpClient} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
