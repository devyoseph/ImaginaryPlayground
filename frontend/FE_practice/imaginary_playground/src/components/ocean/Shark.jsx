import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const SharkglTF = ({ countTwo, countOne, countThree, countFour }) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 화면
  const scene = new THREE.Scene();

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    59, // 앞뒤로 줌인줌아웃
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  // 빛조명
  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 3);
  scene.add(light);

  // 궤도 추적
  // const orbit = new OrbitControls(camera, renderer.domElement);
  // orbit.update();

  // 좌우 / 위아래 / 앞뒤
  camera.position.set(5, 6, 30);

  // glTF 파일 로더
  const assetLoader = new GLTFLoader();

  // 왼쪽에서 두 번째 상어
  let mixer1;
  assetLoader.load(
    "/assets/ocean/shark.gltf",
    function (gltf) {
      // 모델(상어) 로더
      const model = gltf.scene;
      model.position.set(-7, 5, 10);
      scene.add(model);

      // 5회 클릭이 되면 사라지도록 구현
      if (countOne.countOne >= 4) {
        scene.remove(model);
      }

      // 리깅된 애니메이션 구현
      mixer1 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      const clip = THREE.AnimationClip.findByName(clips, "metarigAction");
      const action = mixer1.clipAction(clip);
      action.play();
    }, // 에러잡기
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // 왼쪽에서 세 번째 상어
  let mixer2;

  assetLoader.load(
    "/assets/ocean/shark.gltf",
    function (gltf) {
      const model2 = gltf.scene;
      model2.position.set(13, -1, 10);
      scene.add(model2);

      if (countTwo.countTwo >= 4) {
        scene.remove(model2);
      }

      mixer2 = new THREE.AnimationMixer(model2);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "metarigAction");
      const action = mixer2.clipAction(clip);
      action.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // 왼쪽에서 네 번째 상어
  let mixer3;
  assetLoader.load(
    "/assets/ocean/shark2.gltf",
    function (gltf) {
      const model3 = gltf.scene;
      model3.position.set(15, 7, 15);
      scene.add(model3);

      if (countThree.countThree >= 4) {
        scene.remove(model3);
      }

      mixer3 = new THREE.AnimationMixer(model3);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "metarigAction");
      const action = mixer3.clipAction(clip);
      action.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // 왼쪽에서 첫 번째 상어
  let mixer4;
  assetLoader.load(
    "/assets/ocean/shark1.gltf",
    function (gltf) {
      const model4 = gltf.scene;
      model4.position.set(-5, -3, 10);
      scene.add(model4);

      if (countFour.countFour >= 4) {
        scene.remove(model4);
      }
      mixer4 = new THREE.AnimationMixer(model4);
      const clips = gltf.animations;

      const clip = THREE.AnimationClip.findByName(clips, "metarigAction");
      const action = mixer4.clipAction(clip);
      action.play();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // 애니메이션 구현을 위한 시계
  const clock1 = new THREE.Clock();
  const clock2 = new THREE.Clock();
  const clock3 = new THREE.Clock();
  const clock4 = new THREE.Clock();

  // 애니메이션 구현을 위한 함수(있어야 전체 작동이 됨)
  // 각 상어 업로더 안에서 찾은 애니메이션들을 이 곳에서 시계를 돌려 구현하는 것
  function animate() {
    if (mixer1) mixer1.update(clock1.getDelta());
    if (mixer2) mixer2.update(clock2.getDelta());
    if (mixer3) mixer3.update(clock3.getDelta());
    if (mixer4) mixer4.update(clock4.getDelta());

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  // 반응형 구현
  window.addEventListener("resize", onResize, false);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

// 위의 glTF 로더된 상어를 하나의 컴포넌트로 export
const Shark = ({ countOne, countTwo, countThree, countFour }) => {
  // 캔버스 선택
  var cnvs = document.querySelectorAll("Canvas");
  var arr = Array.prototype.slice.call(cnvs);

  // if (arr.length >= 3) {
  arr.forEach(function (element, idx) {
    if (idx <= arr.length - 2) {
      // console.log(idx)
      element.style.display = "none";
    }
  });
  // }

  return (
    <>
      <SharkglTF
        countOne={{ countOne }}
        countTwo={{ countTwo }}
        countThree={{ countThree }}
        countFour={{ countFour }}
      ></SharkglTF>
    </>
  );
};

export default Shark;
