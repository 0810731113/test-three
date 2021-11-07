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
    var vertexShaderSource = `
      attribute vec4 apos;
      attribute vec4 a_color;
      attribute vec4 a_normal;
      uniform vec3 u_lightColor;
      uniform vec3 u_lightDirection;
      varying vec4 v_color;
      void main(){
      float radian = radians(30.0);
      float cos = cos(radian);
      float sin = sin(radian);
      mat4 mx = mat4(1,0,0,0, 0,cos,-sin,0, 0,sin,cos,0, 0,0,0,1);
      mat4 my = mat4(cos,0,-sin,0, 0,1,0,0, sin,0,cos,0, 0,0,0,1);
      gl_Position = mx*my*apos;
      vec3 normal = normalize((mx*my*a_normal).xyz);
      float dot = max(dot(u_lightDirection,normal),0.0);
      vec3 reflectedLight = u_lightColor * a_color.rgb * dot;
      v_color = vec4(reflectedLight,a_color.a);
      }
    `;

    var fragShaderSource = `
      precision lowp float;
      varying vec4 v_color;
      void main(){
        gl_FragColor = v_color;
      }
    `;
    var program = initShader(gl,vertexShaderSource,fragShaderSource);
    var aposLocation = gl.getAttribLocation(program,'apos');
    var a_color = gl.getAttribLocation(program,'a_color');
    var a_normal = gl.getAttribLocation(program,'a_normal');
    var u_lightColor = gl.getUniformLocation(program,'u_lightColor');
    var u_lightDirection = gl.getUniformLocation(program,'u_lightDirection');

    gl.uniform3f(u_lightColor,1.0,1.0,1.0);
    var x = 1/Math.sqrt(15), y= 2 / Math.sqrt(15), z = 3/ Math.sqrt(15);
    gl.uniform3f(u_lightDirection,x,y,-z);

    /**
     创建顶点位置数据数组data,Javascript中小数点前面的0可以省略
     **/
    var data=new Float32Array([
      .5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,      //面1
      .5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,      //面2
      .5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,      //面3
      -.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,-.5,-.5,-.5,.5,//面4
      -.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,//面5
      .5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5 //面6
    ]);
    /**
     创建顶点颜色数组colorData
     **/
    var colorData = new Float32Array([
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面1
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面2
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面3
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面4
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面5
      1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0 //红色——面6
    ]);
    /**
     *顶点法向量数组normalData
     **/
    var normalData = new Float32Array([
      0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,//z轴正方向——面1
      1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,//x轴正方向——面2
      0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,//y轴正方向——面3
      -1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,//x轴负方向——面4
      0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,//y轴负方向——面5
      0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1//z轴负方向——面6
    ]);

    var normalBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,normalData,gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_normal,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_normal);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_color);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aposLocation);
    gl.enable(gl.DEPTH_TEST);
    gl.drawArrays(gl.TRIANGLES,0,36);

  }

  return (
    <>
      <div className={'webgl-demowebgl4'}>
        <h1 className={styles.title}>我是webgl5</h1>
        <canvas width='500' height='500' style={{background:'#0d72da'}} className={'webgl-container'} id='webgl'></canvas>
      </div>
    </>
  );
}
