import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from '../../shared/toast.service';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent<unknown>;
  let fixture: ComponentFixture<ToastComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [
        ToastService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
