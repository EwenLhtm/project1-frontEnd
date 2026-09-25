import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from '../models/Etudiant';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EtudiantService {
    // Execution de cette operation du composant ou du service.
    constructor(private httpClient: HttpClient) {}

    // Recuperation de la liste des etudiants aupres de l API.
    getEtudiants(): Observable<Etudiant[]> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.get<Etudiant[]>('/api/etudiant', { headers });
    }

    // Recuperation d un etudiant a partir de son identifiant.
    getEtudiantById(id: number): Observable<Etudiant> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.get<Etudiant>(`/api/etudiant/${id}`, { headers });
    }

    // Envoi des donnees d un nouvel etudiant a l API.
    createEtudiant(etudiant: Etudiant): Observable<Object> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.post('/api/etudiant', etudiant, { headers });
    }

    // Mise a jour de l etudiant identifie avec les nouvelles donnees.
    updateEtudiant(id: number, etudiant: Etudiant): Observable<Object> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.put(`/api/etudiant/${id}`, etudiant, { headers });
    }

    // Suppression de l etudiant correspondant a l identifiant fourni.
    deleteEtudiant(id: number): Observable<Object> {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        return this.httpClient.delete(`/api/etudiant/${id}`, { headers });
    }
}
