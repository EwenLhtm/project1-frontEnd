import { Etudiant } from '../models/Etudiant';
import {Observable, of} from 'rxjs';

export class EtudiantMockService {

    // Recuperation de la liste des etudiants aupres de l API.
    getEtudiants(): Observable<Etudiant[]> {
        const etudiants: Etudiant[] = [
            { id: 1, firstName: 'Doe', lastName: 'John', email: 'johndoe@gmaiL.com' },
            { id: 2, firstName: 'Smith', lastName: 'Jane', email: 'janesmith@gmail.com' }
        ];
        return of(etudiants);
    }

    // Recuperation d un etudiant a partir de son identifiant.
    getEtudiantById(id: number): Observable<Etudiant> {
        const etudiant: Etudiant = { id: id, firstName: 'Doe', lastName: 'John', email: 'johndoe@gmaiL.com' };
        return of(etudiant);
    }

    // Envoi des donnees d un nouvel etudiant a l API.
    createEtudiant(etudiant: Etudiant): Observable<Object> {
        return of({ message: 'Etudiant created successfully' });
    }

    // Mise a jour de l etudiant identifie avec les nouvelles donnees.
    updateEtudiant(id: number, etudiant: Etudiant): Observable<Object> {
        return of({ message: 'Etudiant updated successfully' });
    }

    // Suppression de l etudiant correspondant a l identifiant fourni.
    deleteEtudiant(id: number): Observable<Object> {
        return of({ message: 'Etudiant deleted successfully' });
    }
}
