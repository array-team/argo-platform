import { AfterViewInit, ElementRef, Component, OnInit, Input, ViewChild } from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-editor-viewer',
  templateUrl: './editor-viewer.component.html',
  styleUrls: ['./editor-viewer.component.css']
})
export class EditorViewerComponent implements AfterViewInit {
  private camera: THREE.PerspectiveCamera;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private cube: THREE.Mesh;
  private scene: THREE.Scene;
  private  renderer: THREE.WebGLRenderer;

  @Input()
  public rotationSpeedX: number = 0.005;

  @Input()
  public rotationSpeedY: number = 0.01;

  @Input()
  public size: number = 200;

  @Input()
  public cameraZ: number = 3;

  @Input()
  public fieldOfView: number = 70;

  @Input('nearClipping')
  public nearClippingPane: number = 1;

  @Input('farClipping')
  public farClippingPane: number = 1000;

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private createScene() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xeeeeee);

    var gridHelper = new THREE.GridHelper(20, 20, 0xff6666, 0x999999);
    this.scene.add(gridHelper);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;

    this.camera.position.y = 5;
    this.camera.position.z = 20;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderLooping() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, true);
    this.canvas.appendChild(this.renderer.domElement);

    let component: EditorViewerComponent = this;
    (function renderer(){
      requestAnimationFrame(renderer);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  private onWindowResize(this) {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, true);
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderLooping();

    var self = this;
    window.addEventListener('resize', function() {
      self.onWindowResize.call(self);
    }, false);
  }

}
