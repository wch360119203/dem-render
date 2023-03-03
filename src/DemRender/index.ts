import fsShaderSource from './fragmentShader.fs.glsl'
import vsShaderSource from './vertexShader.vs.glsl'
/** DEM绘制工具 */
export class DemRender {
  // 容器
  private readonly container: HTMLCanvasElement
  private readonly program
  // 绘制选项
  private readonly option: createOption
  constructor(opt: createOption) {
    this.container = document.createElement('canvas')
    this.option = opt
    // 设置宽高
    this.container.setAttribute('width', String(opt.ncols))
    this.container.setAttribute('height', String(opt.nrows))
    // 获取上下文
    const ctx = this.getCtx()
    const program = this.compileGLSL(ctx)
    this.program = program
    this.setVariable(ctx, program)
    ctx.clear(ctx.COLOR_BUFFER_BIT)
  }

  /** 绘制dem
   * @param data 格式为cols,rows,value
   */
  public render(data: number[]) {
    const ctx = this.getCtx()
    // 创建buffer
    const buffer = ctx.createBuffer()
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer)
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(data), ctx.STATIC_DRAW)
    // 启用position属性
    const demValue = ctx.getAttribLocation(this.program, 'demValue')
    ctx.enableVertexAttribArray(demValue)
    ctx.vertexAttribPointer(demValue, 3, ctx.FLOAT, false, 0, 0)
    ctx.drawArrays(ctx.POINTS, 0, data.length / 3)
  }

  public getCanvas() {
    return this.container
  }

  /** 获取上下文 */
  private getCtx() {
    const ctx = this.container.getContext('webgl2')
    if (ctx == null) throw new Error('不支持webgl2')
    return ctx
  }

  /** 编译glsl */
  private compileGLSL(ctx: WebGL2RenderingContext) {
    const vertexShader = ctx.createShader(ctx.VERTEX_SHADER)
    if (vertexShader == null) throw new Error('不支持webgl2')
    ctx.shaderSource(vertexShader, vsShaderSource)
    ctx.compileShader(vertexShader)
    const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER)
    if (fragmentShader == null) throw new Error('不支持webgl2')
    ctx.shaderSource(fragmentShader, fsShaderSource)
    ctx.compileShader(fragmentShader)
    // 创建渲染程序
    const program = ctx.createProgram()
    if (program == null) throw new Error('不支持webgl2')
    ctx.attachShader(program, vertexShader)
    ctx.attachShader(program, fragmentShader)
    ctx.linkProgram(program)
    ctx.useProgram(program)
    return program
  }

  /** 设置变量 */
  private setVariable(ctx: WebGL2RenderingContext, program: WebGLProgram) {
    // 设置底色
    ctx.clearColor(0, 0, 0, 0)
    // 设置长宽
    const colsRows = ctx.getAttribLocation(program, 'colsRows')
    ctx.vertexAttrib2f(colsRows, this.option.ncols, this.option.nrows)
    // 设置最大最小值,空值
    const maxValue = ctx.getUniformLocation(program, 'maxValue')
    const minValue = ctx.getUniformLocation(program, 'minValue')
    ctx.uniform1f(maxValue, this.option.maxValue)
    ctx.uniform1f(minValue, this.option.minValue)
  }
}
interface createOption {
  ncols: number
  nrows: number
  maxValue: number
  minValue: number
}
