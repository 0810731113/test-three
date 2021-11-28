import styles from './index.less';
// import * as THREE from 'three';
// import OrbitControls  from 'three-orbitcontrols';
import { useEffect, useState, useCallback } from 'react';
import { renderer } from './js/RenderLoop.js';

export default function IndexPage() {
  useEffect(() => {
    initThree();
  }, []);

  const initThree = () => {
    document.body.appendChild(renderer.domElement);
  };

  return (
    <div className={'three-demo3'}>
      {/*<h1 className={styles.title}>我是threejs</h1>*/}
      <div className={'three-container'} id="threeBox"></div>
    </div>
  );
}
