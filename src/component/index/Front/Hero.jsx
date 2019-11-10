import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader'
const loader = new GLTFLoader();
let mixers = [];
const clock = new THREE.Clock();
let scene;

export default function Hero(props) {

  const onLoad = (gltf, child) => {
    const model = gltf.scene.children[child];


    const animation = gltf.animations[child];

    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);

    const action = mixer.clipAction(animation);
    action.play();
    scene.add(model)
  }
  const onProgress = () => {};
  const onError = (err) => console.log(err);

  function update() {
    const delta = clock.getDelta();
    for (const mixer of mixers) {
      mixer.update(delta)
    }
  }

  useEffect(() => {
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, //field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, //near
      1000 //far
    );
    //set the camera position
    camera.position.set(6, 6, 9);
    let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) //to smooth and transparent background
    renderer.setClearColor('#80e4ff', 0) //background color
    renderer.setSize(window.innerWidth, window.innerHeight) //set the size of the renderer
    const cloud = document.getElementById('floating-cloud')
    cloud.appendChild(renderer.domElement) //now stick it to the element

    //make responsive scene 
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      //change aspect ratio too
      camera.aspect = window.innerWidth / window.innerHeight;
      //update project matrix when update 
      camera.updateProjectionMatrix();
    })


    //the meshes loaded and animate each child

    var cloudOnePath = require('../../images/cloud1.glb')

    loader.load(cloudOnePath, gltf => onLoad(gltf, 1), onProgress, onError  )

    loader.load(cloudOnePath, gltf => onLoad(gltf, 2), onProgress, onError  )


    //the lighting 
    var light = new THREE.AmbientLight(0xFFFFFF, 2);
    light.position.set(10, 0, 25);
    scene.add(light);


    //fix aspect ratio during resize
    var rerender = function () {
      //60 frames per second loop
      requestAnimationFrame(rerender);

      update();
      //apply scene and camera
      renderer.render(scene, camera)
    }
    rerender();


  }, [])

  return (<div id="floating-cloud">

  </div>)
}