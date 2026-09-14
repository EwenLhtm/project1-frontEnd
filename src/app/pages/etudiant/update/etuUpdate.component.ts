import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-etudiant-update',
    imports: [CommonModule, MaterialModule],
    templateUrl: './etuUpdate.component.html',
    standalone: true,
    styleUrl: './etuUpdate.component.css'
})
export class EtuUpdateComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private etudiantService = inject(EtudiantService)
    private router = inject(Router)
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    updateForm: FormGroup = new FormGroup({});
    etudiant: Etudiant | null = null;
    submitted: boolean = false;


    ngOnInit() {
        this.updateForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
        this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(params => {
                const id = Number(params.get('id'));
                this.etudiantService.getEtudiantById(id)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(etudiant => {
                        this.etudiant = etudiant;
                        this.updateForm.patchValue({
                            firstName: etudiant.firstName,
                            lastName: etudiant.lastName,
                            email: etudiant.email
                        });
                    });
            });
    }

    get form() {
        return this.updateForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        const updatedEtudiant: Etudiant = {
            firstName: this.updateForm.get('firstName')?.value,
            lastName: this.updateForm.get('lastName')?.value,
            email: this.updateForm.get('email')?.value
        }
        this.etudiantService.updateEtudiant(this.etudiant!.id!, updatedEtudiant)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.router.navigate(['/etudiant']);
                },
                error: (error) => {
                    this.updateForm.get('email')?.setErrors({
                        emailExists: true
                    });
                }
            });
    }

    goBack(): void {
        this.router.navigate(['/etudiant']);
    }
}