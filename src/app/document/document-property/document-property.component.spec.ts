import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPropertyComponent } from './document-property.component';

describe('DocumentPropertyComponent', () => {
  let component: DocumentPropertyComponent;
  let fixture: ComponentFixture<DocumentPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
