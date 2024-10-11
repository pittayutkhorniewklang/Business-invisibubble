import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      postalCode: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      if (userData.password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.http.post('http://localhost:3000/register', userData).subscribe(
        (response: any) => {
          alert(response.message || 'Registration successful');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert(error.error?.message || 'Registration failed');
        }
      );
    }
  }
}
