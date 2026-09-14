import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-etudiant-detail',
    imports: [CommonModule, MaterialModule],
    templateUrl: './etuDetail.component.html',
    standalone: true,
    styleUrl: './etuDetail.component.css'
})
export class EtuDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private etudiantService = inject(EtudiantService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    etudiant: Etudiant | null = null;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            this.etudiantService.getEtudiantById(id)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((response: any) => {
                    this.etudiant = response;
                });
        })
    }

    goBack() {
        this.router.navigate(['/etudiant']);
    }
    
}