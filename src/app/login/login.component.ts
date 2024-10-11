import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/login', this.loginForm.value).subscribe(
        (response: any) => {
          // เก็บข้อมูลผู้ใช้ใน AuthService
          this.authService.setCurrentUser(response);
          alert(response.message || 'Login successful');

          // ตรวจสอบ role และนำไปยังหน้าที่เหมาะสม
          if (response.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          alert(error.error?.message || 'Invalid credentials');
        }
      );
    }
  }
}