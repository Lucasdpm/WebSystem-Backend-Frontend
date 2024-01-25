import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Access } from './access';
import { environment } from '../environments/environment';

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

  constructor (private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  checkLogIn(): boolean {
    return true
  }

  checkAccess(): Access {
    return Access.admin
  }

  loggedUser() {
    
  }

  signOut() {
    this.localStorageService.clear()
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getUserById(id: number): Observable<User>{
    const url = `${this.url}/${id}`
    return this.httpClient.get<User>(url)
  }

  addUser(newUser: User): Observable<any>{
    return this.httpClient.post<User>(this.url, newUser, this.httpOptions)
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.delete(url, { responseType: 'text'})
  }

  updateUser(id: number, updateUser: User): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.put(url, updateUser, this.httpOptions)
  }
}