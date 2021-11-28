import styles from './index.less';
import * as THREE from 'three';
// import OrbitControls  from 'three-orbitcontrols';
import { useEffect, useState, useCallback } from 'react';

export default function IndexPage() {
  useEffect(() => {
    initThree();
  }, []);

  const initThree = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // document.body.appendChild(renderer.domElement)
    document.getElementById('threeBox').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // const controls = new OrbitControls(camera, renderer.domElement)

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  };

  return (
    <div className={'three-demo2'}>
      <h1 className={styles.title}>我是threejs</h1>
      <div className={'three-container'} id="threeBox"></div>
    </div>
  );
}
