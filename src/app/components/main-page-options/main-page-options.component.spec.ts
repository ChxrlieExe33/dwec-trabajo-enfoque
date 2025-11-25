import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageOptionsComponent } from './main-page-options.component';

describe('MainPageOptionsComponent', () => {
  let component: MainPageOptionsComponent;
  let fixture: ComponentFixture<MainPageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
