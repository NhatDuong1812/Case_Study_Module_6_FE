import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMostLikeComponent } from './playlist-most-like.component';

describe('PlaylistMostLikeComponent', () => {
  let component: PlaylistMostLikeComponent;
  let fixture: ComponentFixture<PlaylistMostLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistMostLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistMostLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
