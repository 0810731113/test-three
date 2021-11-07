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
      'attribute vec4 apos;' +
      'void main(){' +
      'float radian = radians(30.0);'+
      'float cos = cos(radian);' +
      'float sin = sin(radian);' +
      'mat4 mx = mat4(1,0,0,0, 0,cos,-sin,0, 0,sin,cos,0, 0,0,0,1);' +
      'mat4 my = mat4(cos,0,-sin,0, 0,1,0,0, sin,0,cos,0, 0,0,0,1);' +
      'gl_Position = mx*my*apos;' +
      '}';

    var fragShaderSource = '' +
      'void main(){' +
      ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
      '}';
    var program = initShader(gl,vertexShaderSource,fragShaderSource);
    var aposLocation = gl.getAttribLocation(program,'apos');
    //var data = new Float32Array([0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5]);
    //创建立方体的顶点坐标数据
    var data=new Float32Array([
      //z为0.5时，xOy平面上的四个点坐标
      0.5,  0.5,  0.5,
      -0.5,  0.5,  0.5,
      -0.5, -0.5,  0.5,
      0.5, -0.5,  0.5,
      //z为-0.5时，xOy平面上的四个点坐标
      0.5,  0.5, -0.5,
      -0.5,  0.5, -0.5,
      -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
      //上面两组坐标分别对应起来组成一一对
      0.5,  0.5,  0.5,
      0.5,  0.5,  -0.5,

      -0.5,  0.5,  0.5,
      -0.5,  0.5,  -0.5,

      -0.5, -0.5,  0.5,
      -0.5, -0.5,  -0.5,

      0.5, -0.5,  0.5,
      0.5, -0.5,  -0.5,
    ]);


    // for(let i = 0; i < 9; i+= 3){
    //   data[i] -= 0.5;
    // }
    //
    // for(let i = 1; i < 9; i+= 3){
    //   data[i] -= 0.5;
    // }

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aposLocation);
    gl.drawArrays(gl.LINE_LOOP,0,4);
    gl.drawArrays(gl.LINE_LOOP,4,4);
    gl.drawArrays(gl.LINES,8,8);


  }

  return (
    <>
      <div className={'webgl-demo4'}>
        <h1 className={styles.title}>我是webgl4</h1>
        <canvas width='500' height='500' style={{background:'blue'}} className={'webgl-container'} id='webgl'></canvas>
      </div>
    </>
  );
}
