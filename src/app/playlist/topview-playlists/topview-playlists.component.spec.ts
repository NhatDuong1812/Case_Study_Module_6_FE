import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopviewPlaylistsComponent } from './topview-playlists.component';

describe('TopviewPlaylistsComponent', () => {
  let component: TopviewPlaylistsComponent;
  let fixture: ComponentFixture<TopviewPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopviewPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopviewPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
