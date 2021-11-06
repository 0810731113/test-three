import styles from './index.less';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import {useEffect,useState,useCallback} from 'react';

export default function IndexPage() {

  useEffect(() => {
    initThree();
  },[]);

  const initThree = () => {
    let canvas = document.getElementById('webglBox');
    const c = canvas.getContext('2d');
    c.translate(400,300);
    c.strokeStyle = "#158539";

    let x = [];
    let y = [];
    for (let i = 0; i < 6; i++) {
      let r = 200;
      x[i] = r * Math.cos(2 * Math.PI / 6 * i);
      y[i] = r * Math.sin(2 * Math.PI / 6 * i);
    }
    c.moveTo(x[0],y[0]);

    for(let i = 0; i < 6; i++){
      c.lineTo(x[i],y[i]);
    }
    c.closePath();
    c.stroke();
  }

  return (
    <div className={'webgl-demo1'}>
      <h1 className={styles.title}>我是webgl1</h1>
      <canvas width='800px' height='600px' className={'webgl-container'} id='webglBox'></canvas>
    </div>
  );
}
