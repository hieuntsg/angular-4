import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserConditionComponent } from './app-user-condition.component';

describe('AppUserConditionComponent', () => {
  let component: AppUserConditionComponent;
  let fixture: ComponentFixture<AppUserConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
