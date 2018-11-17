//HelloPoint1.js
//顶点着色器程序
var VSHADER_SOURCE =
    'void main() {\n' +
    ' gl_Position = vec4(0.5,0.5,0.0,1.0);\n' +//设置坐标
    'gl_PointSize = 10.0;\n' +//设置尺寸（像素）
    '}\n';

//片元着色器
var FSHADER_SOURCE =
    'void main(){\n' +
    ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +//设置颜色
    '}\n'

//WebGL程序包括运行在浏览器中的JavaScript和运行在WebGL系统的着色器程序这两个部分
function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');

    //获取WebGL绘图上下文
    var gl =getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for webGL');
        return;
    }

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return;
    }
    //设置<canvas>背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.POINTS,0,1);
}