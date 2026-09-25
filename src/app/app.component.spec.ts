import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Regroupement des tests lies a cette fonctionnalite.
describe('AppComponent', () => {
  // Preparation ou nettoyage du contexte commun a chaque test.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  // Verification du scenario et des assertions de ce test.
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Verification du scenario et des assertions de ce test.
  it(`should have the 'etudiant-frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('etudiant-frontend');
  });
});
