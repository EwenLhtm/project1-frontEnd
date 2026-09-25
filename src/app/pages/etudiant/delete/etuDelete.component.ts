import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-etudiant-delete',
    imports: [CommonModule, MaterialModule],
    templateUrl: './etuDelete.component.html',
    standalone: true,
    styleUrl: './etuDelete.component.css'
})
export class EtuDeleteComponent implements OnInit {
    private etudiantService = inject(EtudiantService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);
    etudiant: Etudiant | null = null;

    // Initialisation du composant et chargement des donnees necessaires.
    ngOnInit() {
        this.route.params.subscribe(params => {
                const id = Number(params['id']);
                this.etudiantService.getEtudiantById(id)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({
                        next: (response: any) => {
                            this.etudiant = response;
                        },
                        error: () => {
                            this.router.navigate(['/etudiant']);
                        }
                    });
            });
    }

    // Suppression de l etudiant correspondant a l identifiant fourni.
    deleteEtudiant() {
        if (this.etudiant && this.etudiant.id) {
            this.etudiantService.deleteEtudiant(this.etudiant.id)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: () => {
                        this.router.navigate(['/etudiant']);
                    }
                });
        }
    }

    // Execution de cette operation du composant ou du service.
    goBack() {
        this.router.navigate(['/etudiant']);
    }

}
