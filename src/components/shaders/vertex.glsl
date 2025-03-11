varying vec2 vUv;
uniform sampler2D uDepth;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  
  // Get depth value
  float depth = texture2D(uDepth, vUv).r;

  // Displace vertices based on depth and mouse movement
  vec3 pos = position;
  pos.z += depth * (uMouse.x * 0.1);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
