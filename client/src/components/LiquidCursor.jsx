// src/components/LiquidCursor.jsx
import React, { useEffect, useRef } from 'react'

function LiquidCursor({ isDarkMode }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')

    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    const vertexShader = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform bool u_isDarkMode;

      #define NUM_OCTAVES 5

      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p){
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;

        vec2 mouse = u_mouse/u_resolution;
        mouse.x *= u_resolution.x/u_resolution.y;

        vec3 color = vec3(0.0);

        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00*u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

        float f = fbm(st+r);

        color = mix(
          u_isDarkMode ? vec3(0.101961,0.619608,0.666667) : vec3(0.666667,0.101961,0.619608),
          u_isDarkMode ? vec3(0.666667,0.101961,0.619608) : vec3(0.101961,0.619608,0.666667),
          clamp((f*f)*4.0,0.0,1.0)
        );

        color = mix(
          color,
          u_isDarkMode ? vec3(0,0,0.164706) : vec3(1,1,0.835294),
          clamp(length(q),0.0,1.0)
        );

        color = mix(
          color,
          u_isDarkMode ? vec3(0.666667,1,1) : vec3(0.333333,0,0),
          clamp(length(r.x),0.0,1.0)
        );

        vec2 mouseInfluence = (st - mouse) * 4.0;
        float mouseF = exp(-dot(mouseInfluence, mouseInfluence));

        color = mix(
          color,
          u_isDarkMode ? vec3(1) : vec3(0),
          mouseF * 0.5
        );

        gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,0.5);
      }
    `

    const program = createProgram(gl, vertexShader, fragmentShader)

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse')
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time')
    const isDarkModeUniformLocation = gl.getUniformLocation(program, 'u_isDarkMode')

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    function render(time) {
      time *= 0.001  // convert to seconds

      resizeCanvasToDisplaySize(gl.canvas)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform2f(mouseUniformLocation, mouseX, gl.canvas.height - mouseY)
      gl.uniform1f(timeUniformLocation, time)
      gl.uniform1i(isDarkModeUniformLocation, isDarkMode ? 1 : 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }
  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

function resizeCanvasToDisplaySize(canvas) {
  const displayWidth  = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width  = displayWidth
    canvas.height = displayHeight
    return true
  }
  return false
}

export default LiquidCursor