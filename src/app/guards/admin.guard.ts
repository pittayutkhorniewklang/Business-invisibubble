import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // ต้องมี AuthService เพื่อเช็ค role ของผู้ใช้

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true; // ถ้าเป็นแอดมิน ให้เข้าถึงได้
    } else {
      this.router.navigate(['/home']); // ถ้าไม่ใช่แอดมิน นำไปหน้า Home
      return false;
    }
  }
}
