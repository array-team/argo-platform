import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorViewerComponent } from './editor-viewer.component';

describe('EditorViewerComponent', () => {
  let component: EditorViewerComponent;
  let fixture: ComponentFixture<EditorViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
