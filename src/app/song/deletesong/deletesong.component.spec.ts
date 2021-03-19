import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesongComponent } from './deletesong.component';

describe('DeletesongComponent', () => {
  let component: DeletesongComponent;
  let fixture: ComponentFixture<DeletesongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletesongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
