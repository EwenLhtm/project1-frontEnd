import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../../core/service/user.service';
import { Register } from '../../core/models/Register';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [CommonModule, MaterialModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  ngOnInit() {
    // Initialisation du formulaire de crÃ©ation d'un utilisateur
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    // Facilite l'accÃ¨s aux contrÃ´les du formulaire dans le template
    return this.registerForm.controls;
  }

  onSubmit(): void {
    // Passe la variable submitted Ã  true pour indiquer que le formulaire a Ã©tÃ© soumis
    this.submitted = true;

    if (this.registerForm.invalid) {
      // Si le formulaire est invalide, on ne fait rien et on retourne
      return;
    }
    // CrÃ©e un objet Register Ã  partir des valeurs du formulaire
    const registerUser: Register = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      login: this.registerForm.get('login')?.value,
      password: this.registerForm.get('password')?.value
    };
    // Appelle le service pour enregistrer l'utilisateur et navigue vers la page de connexion en cas de succÃ¨s
    this.userService.register(registerUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next : () => {
          this.router.navigate(['/login']);
        }
      });
  }

  onReset(): void {
    // RÃ©initialise le formulaire et la variable submitted
    this.submitted = false;
    this.registerForm.reset();
  }
}
