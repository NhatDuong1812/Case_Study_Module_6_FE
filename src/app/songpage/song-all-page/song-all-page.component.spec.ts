import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongAllPageComponent } from './song-all-page.component';

describe('SongAllPageComponent', () => {
  let component: SongAllPageComponent;
  let fixture: ComponentFixture<SongAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongAllPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongAllPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
