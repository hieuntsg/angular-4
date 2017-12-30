import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewPdfComponent } from './app-view-pdf.component';

describe('AppViewPdfComponent', () => {
  let component: AppViewPdfComponent;
  let fixture: ComponentFixture<AppViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
