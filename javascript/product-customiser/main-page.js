import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class MainPage extends HTMLElement {
    constructor()
    {
        super();
        this.SCREEN_PERCENTAGE = .7;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, (window.innerWidth * this.SCREEN_PERCENTAGE) / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
        this.loader = new GLTFLoader();
        this.controls;
        this.productMenu = this.querySelector('product-menu');
        this.loadingScreen = document.querySelector('loading-screen');
        this.Init()
    }

    Init()
    {
        this.renderer.setSize(window.innerWidth * this.SCREEN_PERCENTAGE, window.innerHeight);
        this.querySelector("#container3D").appendChild(this.renderer.domElement); //Add the renderer to the DOM

        const HandleLoaded = (scene) =>
        {
            this.scene.add(scene);
            this.AddResizeListener()
            this.ResetView(); 
            this.Animate();
            this.loadingScreen.HideLoadingScreen();
            this.productMenu.Init(this.scene);
        } 

        const HandleUpdateLoadingBar = (value) => this.loadingScreen.UpdateLoadingBar(value);

        this.loader.load(
            `../../models/houses.gltf`,
            function (gltf) {
                //If the file is loaded, add it to the scene
                HandleLoaded(gltf.scene);
                
            },
            function (xhr) {
                //While it is loading, log the progress
                HandleUpdateLoadingBar(xhr.loaded / xhr.total * 100);
            },
            function (error) {
                //If there is an error, log it
                console.error(error);
            }
        );
    }

    Animate() {
        requestAnimationFrame(this.Animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }

    ResetView()
    {
        //Set how far the camera will be from the 3D model
        this.camera.position.set(0, 3, 10);
        // Update rotation
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 2.25, 0);
        this.controls.update();
    }

    AddResizeListener()
    {
        //Add a listener to the window, so we can resize the window and the camera
        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth * this.SCREEN_PERCENTAGE / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth * this.SCREEN_PERCENTAGE, window.innerHeight);
        });
    }
}

customElements.define("main-page", MainPage);
