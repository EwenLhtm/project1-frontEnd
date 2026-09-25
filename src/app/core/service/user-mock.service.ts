import {Register} from '../models/Register';
import {Login} from '../models/Login';
import {Observable, of} from 'rxjs';


export class UserMockService {

  // Transmission des informations d inscription a l API.
  register(user: Register): Observable<Object> {
    return of();
  }

  // Authentification de l utilisateur aupres de l API.
  login(user: Login): Observable<Object> {
    return of();
  }
}
