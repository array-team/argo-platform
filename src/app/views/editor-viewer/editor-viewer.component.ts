import { AfterViewInit, ElementRef, Component, Input, ViewChild } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Component({
  selector: 'app-editor-viewer',
  templateUrl: './editor-viewer.component.html',
  styleUrls: ['./editor-viewer.component.css']
})
export class EditorViewerComponent implements AfterViewInit {
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private imageTarget: THREE.Mesh;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;

  @Input()
  public rotationSpeedX = 0.005;

  @Input()
  public rotationSpeedY = 0.01;

  @Input()
  public size = 200;

  @Input()
  public cameraZ = 3;

  @Input()
  public fieldOfView = 70;

  @Input()
  public nearClippingPane = 1;

  @Input()
  public farClippingPane = 1000;

  private createScene() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xeeeeee);

    const gridHelper = new THREE.GridHelper(20, 20, 0xff6666, 0x999999);
    this.scene.add(gridHelper);

    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;

    this.camera.position.y = 5;
    this.camera.position.z = 20;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderLooping() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, true);
    this.canvas.appendChild(this.renderer.domElement);

    this.createControls(this.camera);

    const component: EditorViewerComponent = this;
    (function renderer(){
      requestAnimationFrame(renderer);
      component.renderer.render(component.scene, component.camera);
    }());
  }

  private onWindowResize(this) {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, true);
  }

  constructor() {
  }

  private createControls(camera) {
    this.controls = new OrbitControls(camera, this.renderer.domElement);
    const self = this;
    this.controls.addEventListener('change', () => {
      self.renderer.render(self.scene, self.camera);
    });
  }

  public AddImageTargetToScene(imgData) {
    const geometry = new THREE.PlaneGeometry(8, 8, 1);
    const texture = new THREE.TextureLoader().load(imgData);

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: texture
    });
    this.imageTarget = new THREE.Mesh(geometry, material);
    this.imageTarget.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(this.imageTarget);
  }

  public Add3DModelToScene(modelData) {
    const loader = new OBJLoader();
    const object = loader.parse(modelData);
    this.scene.add(object);
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderLooping();

    const self = this;
    window.addEventListener('resize', () => {
      self.onWindowResize.call(self);
    }, false);
  }

}
