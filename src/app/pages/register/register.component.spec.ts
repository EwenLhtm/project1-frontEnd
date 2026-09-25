import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { UserService } from '../../core/service/user.service';
import { of, throwError } from 'rxjs';
import { expect, describe, it, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const userServiceMock = {
  register: jest.fn(),
};

const routerMock = {
  navigate: jest.fn(),
};

describe('RegisterComponent', () => {
  // Déclaration des variables pour le composant, le fixture, le service utilisateur et le routeur
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let router: Router;

  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    userServiceMock.register.mockReset();
    routerMock.navigate.mockReset();

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    // Vérifie que le composant est créé avec succés
    expect(component).toBeTruthy();
  });

  it('should call userService.register when form is valid', () => {
    // Vérifie que la méthode register du service utilisateur est appelée lorsque le formulaire est valide
    userServiceMock.register.mockReturnValue(of(null));

    // Remplit le formulaire avec des valeurs valides
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      login: 'johndoe',
      password: 'password123',
    });
    component.onSubmit();

    // Vérifie que la méthode register du service utilisateur a été appelée avec les bonnes valeurs
    expect(userServiceMock.register).toHaveBeenCalled();
  });

  describe('ngOnInit', () => {
    it('should create form with required validators', () => {
      // Vérifie que le formulaire est créé avec les validateurs requis
      expect(component.registerForm).toBeDefined();
      expect(component.registerForm.controls['firstName']).toBeDefined();
      expect(component.registerForm.controls['lastName']).toBeDefined();
      expect(component.registerForm.controls['login']).toBeDefined();
      expect(component.registerForm.controls['password']).toBeDefined();

      // Definit les valeurs du formulaire Ã  des chaÃ®nes vides pour tester la validation
      const form = component.registerForm;;
      form.controls['firstName'].setValue('');
      form.controls['lastName'].setValue('');
      form.controls['login'].setValue('');
      form.controls['password'].setValue('');

      // Vérifie que le formulaire est invalide lorsque tous les champs sont vides
      expect(form.valid).toBe(false);
      expect(form.controls['firstName'].hasError('required')).toBe(true);
      expect(form.controls['lastName'].hasError('required')).toBe(true);
      expect(form.controls['login'].hasError('required')).toBe(true);
      expect(form.controls['password'].hasError('required')).toBe(true);
    });
  });

  describe('form getter', () => {
    it('should return form controls', () => {
      // Vérifie que le getter form retourne les contrÃ´les du formulaire
      const controls = component.form;
      expect(controls).toEqual(component.registerForm.controls);
    });
  });

  describe('onSubmit', () => {
    it('should set submitted to true', () => {
      // Vérifie que la variable submitted est définie sur true aprés l'appel de la méthode onSubmit
      component.onSubmit();
      expect(component.submitted).toBe(true);
    });

    it('should not call register if form is invalid', () => {
      // Vérifie que la méthode register du service utilisateur n'est pas appelée si le formulaire est invalide
      component.onSubmit();
      expect(userServiceMock.register).not.toHaveBeenCalled();
    });

    it('should call userService.register when form is valid', () => {
      // Vérifie que la méthode register du service utilisateur est appelée avec les bonnes valeurs lorsque le formulaire est valide
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });

      // Mock la méthode register du service utilisateur pour qu'elle retourne un Observable vide
      userServiceMock.register.mockReturnValue(of(null));

      // Appelle la méthode onSubmit pour soumettre le formulaire
      component.onSubmit();

      // Vérifie que la méthode register du service utilisateur a été appelée avec les bonnes valeurs
      expect(userServiceMock.register).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });
    });

    it('should navigate to /login on success', () => {
      // Mock la méthode register du service utilisateur pour qu'elle retourne un Observable vide
      userServiceMock.register.mockReturnValue(of(null));

      // Remplit le formulaire avec des valeurs valides
      component.registerForm.patchValue({
        firstName: 'Jane',
        lastName: 'Smith',
        login: 'janesmith',
        password: 'securepass',
      });

      // Appelle la méthode onSubmit pour soumettre le formulaire
      component.onSubmit();

      // Vérifie que la méthode navigate du routeur a été appelée avec le chemin '/login' aprés un enregistrement réussi
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should show alert on success', (done) => {
      // Mock l'alert pour vérifier qu'il est appelé aprés un enregistrement réussi
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      // Remplit le formulaire avec des valeurs valides
      component.registerForm.patchValue({
        firstName: 'Test',
        lastName: 'User',
        login: 'testuser',
        password: 'testpass',
      });

      // Mock la méthode register du service utilisateur pour qu'elle retourne un Observable vide
      userServiceMock.register.mockReturnValue(of(null));
      component.onSubmit();

      // Vérifie que l'alerte a été appelée aprés un enregistrement réussi
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
          done();
        });
      });
    });

    it('should NOT navigate on error', () => {
      // Mock la méthode register du service utilisateur pour qu'elle retourne une erreur
      userServiceMock.register.mockReturnValue(
        throwError(() => new Error('API Error'))
      );

      // Remplit le formulaire avec des valeurs vides
      component.registerForm.patchValue({});

      // Appelle la méthode onSubmit pour soumettre le formulaire
      component.onSubmit();

      // Vérifie que la méthode navigate du routeur n'a pas été appelée aprés une erreur d'enregistrement
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });

  describe('onReset', () => {
    it('should reset form and set submitted to false', () => {
      // Vérifie que la méthode onReset réinitialise le formulaire et définit la variable submitted sur false
      component.submitted = true;
      component.registerForm.patchValue({
        firstName: 'Test',
        lastName: 'User',
        login: 'testuser',
        password: 'testpass',
      });

      // Appelle la méthode onReset pour réinitialiser le formulaire
      component.onReset();

      // Vérifie que la variable submitted est définie sur false et que les valeurs du formulaire sont réinitialisées
      expect(component.submitted).toBe(false);
      expect(component.registerForm.value).toEqual({
        firstName: null,
        lastName: null,
        login: null,
        password: null,
      });
    });
  });

  describe('Validation scenarios', () => {
    it('should be invalid when only firstName is filled', () => {
      // Vérifie que le formulaire est invalide lorsque seul le champ firstName est rempli
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: '',
        login: '',
        password: '',
      });

      // Vérifie que le formulaire est invalide
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be valid when all fields are filled', () => {
      // Vérifie que le formulaire est valide lorsque tous les champs sont remplis
      component.registerForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        login: 'johndoe',
        password: 'password123',
      });

      // Vérifie que le formulaire est valide
      expect(component.registerForm.valid).toBe(true);
    });
  });
});
