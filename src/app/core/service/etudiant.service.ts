import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from '../models/Etudiant';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EtudiantService {
    constructor(private httpClient: HttpClient) {}

    getEtudiants(): Observable<Etudiant[]> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.get<Etudiant[]>('/api/etudiant', { headers });
    }

    getEtudiantById(id: number): Observable<Etudiant> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.get<Etudiant>(`/api/etudiant/${id}`, { headers });
    }
}