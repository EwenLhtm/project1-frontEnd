import { Injectable } from '@angular/core';
import { Register } from '../models/Register';
import { Login } from '../models/Login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Execution de cette operation du composant ou du service.
  constructor(private httpClient: HttpClient) { }

  // Transmission des informations d inscription a l API.
  register(user: Register): Observable<Object> {
    return this.httpClient.post('/api/register', user);
  }

  // Authentification de l utilisateur aupres de l API.
  login(user: Login): Observable<Object> {
    return this.httpClient.post('/api/login', user);
  }
}
