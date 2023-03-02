//设置浮点数精度为中等精度
precision mediump float;
//接收点在 canvas 坐标系上的坐标 (x, y)
attribute vec3 demValue;
//接收 canvas 的宽高尺寸
attribute vec2 colsRows;
varying float dValue;
void main() {
  vec2 xy = vec2(demValue[0], demValue[1]);
    //start 将屏幕坐标系转化为裁剪坐标（裁剪坐标系）
  vec2 position = (xy / colsRows) * 2.0 - 1.0;
  position = position * vec2(1, -1);
  gl_Position = vec4(position, 0, 1);
   //end 将屏幕坐标系转化为裁剪坐标（裁剪坐标系）
   //声明要绘制的点的大小。
  gl_PointSize = 1.0;
  dValue = demValue[2];
}