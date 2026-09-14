import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-etudiant-list',
    imports: [CommonModule, MaterialModule],
    templateUrl: './list.component.html',
    standalone: true,
    styleUrl: './list.component.css'
})
export class listComponent implements OnInit {
    private etudiantService = inject(EtudiantService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    etudiants: Etudiant[] = [];


    ngOnInit() {
        this.etudiantService.getEtudiants()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response: any) => {
                this.etudiants = response;
            })
    }

    detailEtudiant(id: number) {
        this.router.navigate(['/etudiant/detail', id]);
    }

    updateEtudiant(id: number) {
        this.router.navigate(['/etudiant/update', id]);
    }

    deleteEtudiant(id: number) {
        this.router.navigate(['/etudiant/delete', id]);
    }

    createEtudiant() {
        this.router.navigate(['/etudiant/create']);
    }
}