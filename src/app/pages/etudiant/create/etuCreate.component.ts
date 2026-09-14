import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-etudiant-detail',
    imports: [CommonModule, MaterialModule],
    templateUrl: './etuCreate.component.html',
    standalone: true,
    styleUrl: './etuCreate.component.css'
})
export class EtuCreateComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private etudiantService = inject(EtudiantService)
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);
    createForm: FormGroup = new FormGroup({});
    submitted: boolean = false;

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['',Validators.required],
            email: ['', [Validators.required, Validators.email]]
        })
    }

    get form() {
        return this.createForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.createForm.invalid) {
            return;
        }
        const newEtudiant: Etudiant = {
            firstName: this.createForm.get('firstName')?.value,
            lastName: this.createForm.get('lastName')?.value,
            email: this.createForm.get('email')?.value
        }
        this.etudiantService.createEtudiant(newEtudiant)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.router.navigate(['/etudiant']);
                },
                error: (error) => {
                    this.createForm.get('email')?.setErrors({
                        emailExists: true
                    });
                }
            });
    }

    onReset(): void {
        this.submitted = false;
        this.createForm.reset();
    }

}