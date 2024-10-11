import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, { provide: Router, useValue: { navigate: () => {} } }]
    });

    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for an admin', () => {
    // ทดสอบการอนุญาตให้ใช้งานในกรณี admin
    expect(guard.canActivate()).toBe(true);
  });

  it('should not allow activation for a non-admin', () => {
    // ทดสอบการไม่อนุญาตให้ใช้งานในกรณี non-admin
    expect(guard.canActivate()).toBe(false);
  });
});
