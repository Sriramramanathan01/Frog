import { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import SceneInit from './lib/SceneInit';

function App() {
  const frogRef = useRef();
  const gltfSceneRef = useRef();

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const glftLoader = new GLTFLoader();
    glftLoader.load('src/assets/frog.gltf', (gltfScene) => {
      const frogModel = gltfScene.scene;
      frogRef.current = frogModel;
      const material = new THREE.MeshPhongMaterial({ color: 0xF5DEB3});
      frogModel.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      frogModel.scale.set(0.25, 0.25, 0.25);
      frogModel.position.set(0, -10, 0);
      test.scene.add(frogModel);

      gltfSceneRef.current = gltfScene;
    }); 

    const handleKeyDown = (event) => {
      const rotationAmount = 0.1;
      const maxRotAmt = Math.PI/4;
      const skullBone = gltfSceneRef.current.scene.getObjectByName('Skull');
      if (event.code === 'KeyD' && skullBone.rotation.y > (-1 * maxRotAmt)) {
        skullBone.rotation.y -= rotationAmount;
      } else if (event.code === 'KeyA' && skullBone.rotation.y < maxRotAmt) {
        skullBone.rotation.y += rotationAmount;
      }
      else if (event.shiftKey && event.code === 'ArrowUp') {
        if (frogRef.current) {
          frogRef.current.rotation.x -= 0.05;
        }
      }
      else if (event.shiftKey && event.code === 'ArrowDown') {
        if (frogRef.current) {
          frogRef.current.rotation.x += 0.05;
        }
      }
      else if (event.shiftKey && event.code === 'ArrowLeft') {
        if (frogRef.current) {
          frogRef.current.rotation.z -= 0.05;
        }
      }
      else if (event.shiftKey && event.code === 'ArrowRight') {
        if (frogRef.current) {
          frogRef.current.rotation.z += 0.05;
        }
      }
      else if (event.code === 'ArrowUp') {
        if (frogRef.current) {
          frogRef.current.position.z -= 0.5;
        }
      }
      else if (event.code === 'ArrowDown') {
        if (frogRef.current) {
          frogRef.current.position.z += 0.5;
        }
      }
      else if (event.code === 'ArrowLeft') {
        if (frogRef.current) {
          frogRef.current.position.x -= 0.5;
        }
      }
      else if (event.code === 'ArrowRight') {
        if (frogRef.current) {
          frogRef.current.position.x += 0.5;
        }
      }
      
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
