import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlaylistnewComponent } from './list-playlistnew.component';

describe('ListPlaylistnewComponent', () => {
  let component: ListPlaylistnewComponent;
  let fixture: ComponentFixture<ListPlaylistnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlaylistnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlaylistnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
