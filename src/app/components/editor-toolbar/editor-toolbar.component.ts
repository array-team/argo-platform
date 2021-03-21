import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArEditorComponent } from '../../views/ar-editor/ar-editor.component'

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Output() onImageTargetUpload = new EventEmitter<string>();
  private url = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
        this.onImageTargetUpload.emit(this.url);
      }
    }
  }
}
