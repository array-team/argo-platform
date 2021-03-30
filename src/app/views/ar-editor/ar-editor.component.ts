import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorViewerComponent } from '../editor-viewer/editor-viewer.component'

@Component({
  selector: 'app-ar-editor',
  templateUrl: './ar-editor.component.html',
  styleUrls: ['./ar-editor.component.css']
})

export class ArEditorComponent implements OnInit {

  constructor() { }

  @ViewChild(EditorViewerComponent) editorViewer: EditorViewerComponent;

  ngOnInit(): void {

  }

  public setImageTarget(event) {
    this.editorViewer.AddImageTargetToScene(event);
  }

  public set3DModel(event) {
    this.editorViewer.Add3DModelToScene(event);
  }
}
