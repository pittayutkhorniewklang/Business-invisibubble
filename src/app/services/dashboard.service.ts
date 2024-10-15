import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';  // URL สำหรับ API

  constructor(private http: HttpClient) {}

  // ดึงยอดขายรายเดือน
  getMonthlySales(month: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly/${month}`);
  }

  // ดึงสินค้าขายดี
  getTopSellingProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/top-selling`);
  }

  // ดึงยอดขายตามช่วงเวลา
  getSalesByRange(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/range?startDate=${startDate}&endDate=${endDate}`);
  }
}
