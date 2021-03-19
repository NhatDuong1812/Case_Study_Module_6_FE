import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsongPlaylistComponent } from './listsong-playlist.component';

describe('ListsongPlaylistComponent', () => {
  let component: ListsongPlaylistComponent;
  let fixture: ComponentFixture<ListsongPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsongPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsongPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
