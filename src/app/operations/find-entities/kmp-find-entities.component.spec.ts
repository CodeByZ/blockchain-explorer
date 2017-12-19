import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationFindEntitiesComponent } from './kmp-find-entities.component';

describe('OperationFindEntitiesComponent', () => {
  let component: OperationFindEntitiesComponent;
  let fixture: ComponentFixture<OperationFindEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationFindEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationFindEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
