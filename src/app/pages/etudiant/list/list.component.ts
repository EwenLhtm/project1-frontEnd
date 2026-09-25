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


    // Initialisation du composant et chargement des donnees necessaires.
    ngOnInit() {
        this.etudiantService.getEtudiants()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response: any) => {
                    this.etudiants = response;
                },
                error: () => {
                    this.router.navigate(['/login']);
                }

            })
    }

    // Ouverture de la page de detail de l etudiant selectionne.
    detailEtudiant(id: number) {
        this.router.navigate(['/etudiant/detail', id]);
    }

    // Mise a jour de l etudiant identifie avec les nouvelles donnees.
    updateEtudiant(id: number) {
        this.router.navigate(['/etudiant/update', id]);
    }

    // Suppression de l etudiant correspondant a l identifiant fourni.
    deleteEtudiant(id: number) {
        this.router.navigate(['/etudiant/delete', id]);
    }

    // Envoi des donnees d un nouvel etudiant a l API.
    createEtudiant() {
        this.router.navigate(['/etudiant/create']);
    }
}
