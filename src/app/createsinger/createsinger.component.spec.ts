import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesingerComponent } from './createsinger.component';

describe('CreatesingerComponent', () => {
  let component: CreatesingerComponent;
  let fixture: ComponentFixture<CreatesingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesingerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
