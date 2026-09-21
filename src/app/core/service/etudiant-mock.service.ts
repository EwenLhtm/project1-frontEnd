import { Etudiant } from '../models/Etudiant';
import {Observable, of} from 'rxjs';

export class EtudiantMockService {

    getEtudiants(): Observable<Etudiant[]> {
        const etudiants: Etudiant[] = [
            { id: 1, firstName: 'Doe', lastName: 'John', email: 'johndoe@gmaiL.com' },
            { id: 2, firstName: 'Smith', lastName: 'Jane', email: 'janesmith@gmail.com' }
        ];
        return of(etudiants);
    }

    getEtudiantById(id: number): Observable<Etudiant> {
        const etudiant: Etudiant = { id: id, firstName: 'Doe', lastName: 'John', email: 'johndoe@gmaiL.com' };
        return of(etudiant);
    }

    createEtudiant(etudiant: Etudiant): Observable<Object> {
        return of({ message: 'Etudiant created successfully' });
    }

    updateEtudiant(id: number, etudiant: Etudiant): Observable<Object> {
        return of({ message: 'Etudiant updated successfully' });
    }

    deleteEtudiant(id: number): Observable<Object> {
        return of({ message: 'Etudiant deleted successfully' });
    }
}