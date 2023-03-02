import fsShaderSource from './fragmentShader.fs.glsl';
import vsShaderSource from './vertexShader.vs.glsl';
/**DEM绘制工具 */
export class DemRender {
  // 容器
  private container: HTMLCanvasElement;
  private program;
  // 绘制选项
  private option: createOption;
  constructor(opt: createOption) {
    this.container = document.createElement('canvas');
    this.option = opt;
    // 设置宽高
    this.container.setAttribute('width', String(opt.ncols));
    this.container.setAttribute('height', String(opt.nrows));
    // 获取上下文
    const ctx = this.getCtx();
    const program = this.compileGLSL(ctx);
    this.program = program;
    this.setVariable(ctx, program);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
  }
  /**绘制dem */
  public render(data: Float32Array) {
    const ctx = this.getCtx();
    // 创建buffer
    const buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, data, ctx.STATIC_DRAW);
    // 启用position属性
    const demValue = ctx.getAttribLocation(this.program, 'demValue');
    ctx.enableVertexAttribArray(demValue);
    ctx.vertexAttribPointer(demValue, 3, ctx.FLOAT, false, 0, 0);
    ctx.drawArrays(ctx.POINTS, 0, data.length / 3);
  }
  public getCanvas() {
    return this.container;
  }
  /**获取上下文 */
  private getCtx() {
    const ctx = this.container.getContext('webgl2');
    if (!ctx) throw new Error('不支持webgl2');
    return ctx;
  }
  /**编译glsl */
  private compileGLSL(ctx: WebGL2RenderingContext) {
    const vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
    if (!vertexShader) throw new Error('不支持webgl2');
    ctx.shaderSource(vertexShader, vsShaderSource);
    ctx.compileShader(vertexShader);
    const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);
    if (!fragmentShader) throw new Error('不支持webgl2');
    ctx.shaderSource(fragmentShader, fsShaderSource);
    ctx.compileShader(fragmentShader);
    // 创建渲染程序
    const program = ctx.createProgram();
    if (!program) throw new Error('不支持webgl2');
    ctx.attachShader(program, vertexShader);
    ctx.attachShader(program, fragmentShader);
    ctx.linkProgram(program);
    ctx.useProgram(program);
    return program;
    // // 获取变量
    // const aPosition = gl.getAttribLocation(program, 'a_Position');
    // const aScreenSize = gl.getAttribLocation(program, 'a_Screen_Size');
    // const uColor = gl.getUniformLocation(program, 'u_Color');
    // // 设置变量
    // gl.vertexAttrib2f(aScreenSize, data.ncols, data.nrows);
    // const gap = data.maxValue - data.minValue;
    // for (let row = 0; row < data.data.length; row++) {
    //   const arr = data.data[row];
    //   arr.forEach((item) => {
    //     const col = item[0];
    //     const val = item[1];
    //     gl.vertexAttrib2f(aPosition, col, row);
    //     const color = ((val - data.minValue) / gap) * 255;
    //     gl.uniform4f(uColor, 0, color, 0, 1);
    //     gl.drawArrays(gl.POINTS, 0, 1);
    //   });
    // }
  }
  /**设置变量 */
  private setVariable(ctx: WebGL2RenderingContext, program: WebGLProgram) {
    // 设置底色
    ctx.clearColor(0, 0, 0, 0);
    // 设置长宽
    const colsRows = ctx.getAttribLocation(program, 'colsRows');
    ctx.vertexAttrib2f(colsRows, this.option.ncols, this.option.nrows);
    // 设置最大最小值,空值
    const maxValue = ctx.getUniformLocation(program, 'maxValue');
    const minValue = ctx.getUniformLocation(program, 'minValue');
    const NODATA_value = ctx.getUniformLocation(program, 'NODATA_value');
    ctx.uniform1f(maxValue, this.option.maxValue);
    ctx.uniform1f(minValue, this.option.minValue);
    ctx.uniform1f(NODATA_value, this.option.NODATA_value);
  }
}
interface createOption {
  ncols: number;
  nrows: number;
  maxValue: number;
  minValue: number;
  NODATA_value: number;
}
