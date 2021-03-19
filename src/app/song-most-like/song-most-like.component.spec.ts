import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongMostLikeComponent } from './song-most-like.component';

describe('SongMostLikeComponent', () => {
  let component: SongMostLikeComponent;
  let fixture: ComponentFixture<SongMostLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongMostLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongMostLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
