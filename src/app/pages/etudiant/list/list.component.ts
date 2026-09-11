import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { EtudiantService } from '../../../core/service/etudiant.service';
import { Etudiant } from '../../../core/models/Etudiant';
import { Observable } from 'rxjs';
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
    etudiants: Etudiant[] = [];


    ngOnInit() {
        this.etudiantService.getEtudiants()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response: any) => {
                this.etudiants = response;
            })
    }
}