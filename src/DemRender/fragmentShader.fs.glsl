//设置浮点数精度为中等精度
precision mediump float;
uniform float maxValue;
uniform float minValue;
varying float dValue;
void main() {
  float percent = (dValue - minValue) / (maxValue - minValue);
    //将普通的颜色表示转化为 WebGL 需要的表示方式，即将【0-255】转化到【0,1】之间。
  gl_FragColor = vec4(0, percent, 0, 1);
}