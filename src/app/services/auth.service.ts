// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }

  setCurrentUser(user: any) {
    if (typeof window !== 'undefined' && localStorage) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      this.currentUserSubject.next(null);
      localStorage.removeItem('currentUser');
    }
  }

  // เพิ่มเมธอด isAdmin เพื่อตรวจสอบ role ของผู้ใช้
  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.role === 'admin';
  }
}
