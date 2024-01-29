import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Access } from './access';
import { environment } from '../environments/environment';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  url = `${environment.MainUrl}/user`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor (private http: AuthHttpService, private localStorageService: LocalStorageService, private router: Router) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url)
  }

  getUserById(id: number): Observable<User>{
    const url = `${this.url}/${id}`
    return this.http.get<User>(url)
  }

  getUserAccessById(id: number): Observable<Access> {
    const url = `${this.url}/userAccess/${id}`
    return this.http.get<Access>(url)
  }

  addUser(newUser: User): Observable<any>{
    return this.http.post<User>(this.url, newUser, this.httpOptions)
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    return this.http.delete(url, { responseType: 'text'})
  }

  updateUser(id: number, updateUser: User): Observable<any> {
    const url = `${this.url}/${id}`
    return this.http.put(url, updateUser, this.httpOptions)
  }

  UserEmailVerifeier(email: string): Observable<Access> {
    const url = `${this.url}/userEmail/${email}`
    return this.http.get(url)
  }

  UserCpfVerifeier(cpf: string): Observable<Access> {
    const url = `${this.url}/userCpf/${cpf}`
    return this.http.get(url)
  }
}
