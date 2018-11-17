//HelloPoint1.js
//Vectex shader program
var VSHADER_SOURCE =
    'void main(){\n' +
    '  gl_Position = vec4(0.0, 0.5, 0.0, 1.0);\n'+
    '  gl_PointSize =10.0;\n'+
    '}\n';

//Fragment shader program
var FSHADER_SOURCE =
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main() {
    //Retrive<canvas>element
    var canvas = document.getElementById('webgl');

    //Get the rendring context for WebGL
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('Failed to initialize shader');
        return;
    }

    //设置<canvas>的背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制一个点
    gl.drawArrays(gl.POINTS,0,1);


}