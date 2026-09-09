import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { Login } from '../../core/models/Login';
import { UserService } from '../../core/service/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-login',
    imports: [CommonModule, MaterialModule],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    private userService = inject(UserService);
    private formBuilder = inject(FormBuilder);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    loginForm: FormGroup = new FormGroup({});
    submitted: boolean = false;

    ngOnInit() {
        this.loginForm = this.formBuilder.group(
            {
                login: ['', Validators.required],
                password: ['', Validators.required]
            },
        );
    }

    get form() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const loginUser: Login = {
            login: this.loginForm.get('login')?.value,
            password: this.loginForm.get('password')?.value
        };

        this.userService.login(loginUser)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
            (response: any) => {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
            },
        );
    }

    onReset(): void {
        this.submitted = false;
        this.loginForm.reset();
    }
}
