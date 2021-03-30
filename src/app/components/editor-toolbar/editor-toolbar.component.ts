import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Output() onImageTargetUpload = new EventEmitter<string>();
  @Output() on3DModelUpload = new EventEmitter<string>();
  private url = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result as string;
        this.onImageTargetUpload.emit(this.url);
      }
    }
  }

  onSelect3DModel(event)
  {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsText(event.target.files[0]);

      reader.onload = (event) => {
        this.on3DModelUpload.emit(event.target.result as string);
      }
    }
  }
}
