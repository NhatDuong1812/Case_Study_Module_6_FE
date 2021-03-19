import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsongComponent } from './listsong.component';

describe('ListsongComponent', () => {
  let component: ListsongComponent;
  let fixture: ComponentFixture<ListsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
