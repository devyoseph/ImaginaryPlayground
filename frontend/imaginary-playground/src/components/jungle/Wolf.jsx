import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SampleglTF2 = ({ id }) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const dom = document.body.appendChild(renderer.domElement);
  dom.setAttribute("id", `${id}`);
  dom.setAttribute("class", "whale_3d");
  dom.style.position = "absolute";
  dom.style.left = "17%";
  dom.style.top = "22%";
  dom.style.zIndex = "1";
  // dom.setAttribute("class", "appear");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    100, // 앞뒤로 줌인줌아웃
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
  scene.add(light);

  // 궤도 추적
  // const orbit = new OrbitControls(camera, renderer.domElement);
  // orbit.update();

  // 좌우 / 위아래 / 앞뒤
  camera.position.set(12, 12, 30);

  const assetLoader = new GLTFLoader();

  let mixer1;
  let model;
  assetLoader.load(
    "/assets/jungle/wolf.gltf",
    function (gltf) {
      model = gltf.scene;
      // gltf.scene.scale.set(0.9, 0.9, 0.9);
      gltf.scene.scale.multiplyScalar(18);
      model.position.set(4, 7, 16);
      scene.add(model);

      mixer1 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "01_Run");
      const action = mixer1.clipAction(clip);
      action?.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const clock1 = new THREE.Clock();
  let left = 0;
  function animate() {
    if (mixer1) mixer1.update(clock1.getDelta());

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", onResize, false);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

const Wolf = ({ id }) => {
  return (
    <>
      <SampleglTF2 id={id}></SampleglTF2>
    </>
  );
};

export default React.memo(Wolf);
