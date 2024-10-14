import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'; // นำเข้า Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) { // Inject Router
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

  getUserName(): string {
    const currentUser = this.currentUserSubject.value;
    console.log("Current User: ", currentUser);  // ตรวจสอบค่า currentUser
    return currentUser ? currentUser.username : 'Guest';  // เปลี่ยนจาก currentUser.name เป็น currentUser.username
  }
  

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      this.currentUserSubject.next(null);
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']); // Redirect ไปที่หน้า Login หลังจาก Logout
    }
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.role === 'admin';
  }
}
