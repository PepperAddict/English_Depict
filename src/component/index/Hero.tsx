import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
// import GLTFLoader from 'three-gltf-loader';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const {GLTFLoader} = require('three/examples/jsm/loaders/GLTFLoader')

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const loader = new GLTFLoader();
  let mixers = [];
  const clock = new THREE.Clock();
  let scene;

  const onLoad = (gltf, child) => {
    const model = gltf.scene.children[child];
    const animation = gltf.animations[child];

    //texture
    const imageTexture = require('../../img/3D/gradientMap.jpg');
    var texture = new THREE.TextureLoader().load(imageTexture.src);

    model.material = new THREE.MeshToonMaterial({
      gradientMap: texture,
      shininess: 10
    });


    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();
    scene.add(model);
  };
  const onProgress = () => {
    // console.log( `3D model ${( xhr.loaded / xhr.total * 100 )}% loaded` );
   };
  const onError = (err) => console.log(err);

  function update() {
    const delta = clock.getDelta();
    for (const mixer of mixers) {
      mixer.update(delta);
    }
  }


  useEffect(() => {

    setLoaded(true);
    if (loaded) {
      const cloud = document.getElementById('floating-cloud');
      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75, //field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        0.1, //near
        1000 //far
      );
      //set the camera position
      camera.position.set(8, 10, 15); //side up/down zoom
      let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //to smooth and transparent background
      renderer.setClearColor('#80e4ff', 0); //background color. not needed
      renderer.setSize(window.innerWidth, window.innerHeight); //set the size of the renderer

      cloud.appendChild(renderer.domElement); //now stick it to the element

      //make responsive scene 
      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        //change aspect ratio too
        camera.aspect = window.innerWidth / window.innerHeight;
        //update project matrix when update 
        camera.updateProjectionMatrix();
      });


      //the meshes loaded and animate each child
      var cloudOnePath = require('../../img/3D/cloud1.glb');
      //loader.load needs a path. check how importing sends the string. May end up being an object

      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 1), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 2), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 3), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 4), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 5), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 6), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 7), onProgress, onError);
      loader.load(cloudOnePath.default, gltf => onLoad(gltf, 8), onProgress, onError);

      // the lighting 
      var light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1); //sky ground intensity
      light.castShadow = true;
      light.position.set(10, 30, 25);
      scene.add(light);

      scene.add(new THREE.AmbientLight(0xFFFFFF, .2));
      var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);



      //fix aspect ratio during resize
      var rerender = function () {
        //60 frames per second loop
        requestAnimationFrame(rerender);

        update();
        //apply scene and camera
        renderer.render(scene, camera);
      };
      rerender();
    }


  }, [loaded]);

  return (
    <div id="floating-cloud">
    </div>
  );
}