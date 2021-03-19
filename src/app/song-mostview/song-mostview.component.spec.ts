import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongMostviewComponent } from './song-mostview.component';

describe('SongMostviewComponent', () => {
  let component: SongMostviewComponent;
  let fixture: ComponentFixture<SongMostviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongMostviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongMostviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
