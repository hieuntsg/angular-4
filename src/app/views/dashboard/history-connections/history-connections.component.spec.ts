import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryConnectionsComponent } from './history-connections.component';

describe('HistoryConnectionsComponent', () => {
  let component: HistoryConnectionsComponent;
  let fixture: ComponentFixture<HistoryConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
