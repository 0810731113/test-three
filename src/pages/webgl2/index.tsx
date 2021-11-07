import styles from './index.less';
import * as THREE from 'three';
import OrbitControls  from 'three-orbitcontrols';
import {useEffect,useState,useCallback} from 'react';

export default function IndexPage() {

  useEffect(() => {
    initThree();
  },[]);

  function initShader(gl,vertexShaderSource,fragShaderSource){
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader,vertexShaderSource);
    gl.shaderSource(fragmentShader,fragShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
  }

  const initThree = () => {
    let canvas = document.getElementById('webgl');
    const gl = canvas.getContext('webgl');
    var vertexShaderSource = '' +
      'void main(){' +
      ' gl_PointSize=20.0;' +
      ' gl_Position =vec4(0.0,0.0,0.0,1.0);' +
      '}';

    var fragShaderSource = '' +
      'void main(){' +
      ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
      '}';
    var program = initShader(gl,vertexShaderSource,fragShaderSource);
    gl.drawArrays(gl.POINTS,0,1);


  }

  return (
    <div className={'webgl-demo2'}>
      <h1 className={styles.title}>我是webgl2</h1>
      <canvas width='500' height='500' style={{background:'blue'}} className={'webgl-container'} id='webgl'></canvas>
    </div>
  );
}
