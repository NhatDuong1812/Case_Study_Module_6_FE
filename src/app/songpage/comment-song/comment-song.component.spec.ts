import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSongComponent } from './comment-song.component';

describe('CommentSongComponent', () => {
  let component: CommentSongComponent;
  let fixture: ComponentFixture<CommentSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
