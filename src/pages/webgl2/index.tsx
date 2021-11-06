import styles from './index.less';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import {useEffect,useState,useCallback} from 'react';

export default function IndexPage() {

  useEffect(() => {
    initThree();
  },[]);

  const initThree = () => {
    let canvas = document.getElementById('webgl');
    const c = canvas.getContext('2d');

  }

  return (
    <div className={'webgl-demo2'}>
      <h1 className={styles.title}>我是webgl2</h1>
      <canvas width='500' height='500' style={{background:'blue'}} className={'webgl-container'} id='webgl'></canvas>
    </div>
  );
}
