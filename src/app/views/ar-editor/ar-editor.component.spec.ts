import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArEditorComponent } from './ar-editor.component';

describe('ArEditorComponent', () => {
  let component: ArEditorComponent;
  let fixture: ComponentFixture<ArEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
