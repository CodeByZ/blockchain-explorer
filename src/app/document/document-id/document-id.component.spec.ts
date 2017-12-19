import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentIdComponent } from './document-id.component';

describe('DocumentIdComponent', () => {
  let component: DocumentIdComponent;
  let fixture: ComponentFixture<DocumentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
