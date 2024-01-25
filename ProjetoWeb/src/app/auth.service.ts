import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { UserService } from './user.service';
import { Access } from './access';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  mainUrl = environment.MainUrl
  registerUrl = 'AuthManagement/Register'
  loginUrl = 'AuthManagement/Login'
  userUrl = 'user'

  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.mainUrl}/${this.registerUrl}`, user)
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.mainUrl}/${this.loginUrl}`, user)
  }
}
