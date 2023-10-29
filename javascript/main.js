import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SCREEN_PERCENTAGE = .7;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth * SCREEN_PERCENTAGE) / window.innerHeight, 0.1, 1000 );

let controls;

const loader = new GLTFLoader();


loader.load(
    `models/scene.gltf`,
    function (gltf) {
      //If the file is loaded, add it to the scene
      scene.add(gltf.scene);
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth * SCREEN_PERCENTAGE, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

AddResizeListener()
ResetView(); 
Animate(); // Start 3D rendering


function Animate() {
    requestAnimationFrame(Animate);
    renderer.render(scene, camera);
}

function ResetView()
{
    //Set how far the camera will be from the 3D model
    camera.position.set(0, 3, 10);

    // Update rotation
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2.25, 0);
    controls.update();
}

function AddResizeListener()
{
    //Add a listener to the window, so we can resize the window and the camera
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth * SCREEN_PERCENTAGE / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth * SCREEN_PERCENTAGE, window.innerHeight);
    });
}