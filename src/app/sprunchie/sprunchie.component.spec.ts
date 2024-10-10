import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprunchieComponent } from './sprunchie.component';

describe('SprunchieComponent', () => {
  let component: SprunchieComponent;
  let fixture: ComponentFixture<SprunchieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprunchieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprunchieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
