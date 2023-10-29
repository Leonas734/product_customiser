import * as THREE from 'three';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let controls;

const loader = new GLTFLoader();

loader.load(
    `models/scene.gltf`,
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      scene.add(object);
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
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.set(-3, 3, 7.5);

//camera.up.set(0,1,0);
//camera.rotation.set(20,0,0);

controls = new OrbitControls(camera, renderer.domElement);

// controls.lookAt(new THREE.Vector3(0, 0, 0));

//Render the scene
function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement
    renderer.render(scene, camera);
  }
  
  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  //add mouse position listener, so we can make the eye move
  document.onmousemove = (e) => {
    console.log(camera);
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  //Start the 3D rendering
  animate();