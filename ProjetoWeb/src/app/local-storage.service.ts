import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  

  set (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get (key: string): User {
    return <User>JSON.parse(<string>localStorage.getItem(key))
  }

  clear() {
    localStorage.clear()
  }
}
