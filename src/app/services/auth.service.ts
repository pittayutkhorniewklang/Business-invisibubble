import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/backend';  // URL ไปยัง Backend

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_register.php`, data);  // ตรวจสอบเส้นทางนี้
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/process_login.php`, data);
  }
}
