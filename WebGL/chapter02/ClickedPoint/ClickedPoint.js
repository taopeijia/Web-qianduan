//ClickedPoints.js
//顶点着色器
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +//设置坐标
    'gl_PointSize = a_PointSize;\n' +//设置尺寸（像素）
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
    //获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    //注册鼠标点击事件响应函数
    canvas.onmousedown = function (ev) { click(ev,gl,canvas,a_Position);
    };
    //将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
    gl.vertexAttrib1f(a_PointSize,10.0);
    //设置<canvas>背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var g_points = [];//鼠标点击位置数组
    function click(ev,gl,canvas,a_Position) {
        var x =ev.clientX;//鼠标点击处的x坐标
        var y = ev.clientY;//鼠标点击处的y坐标
        var rect = ev.target.getBoundingClientRect();
        x =((x - rect.left)-canvas.height/2)/(canvas.height/2);
        y =(canvas.width/2 - (y - rect.top))/(canvas.width/2);
        //将坐标存储到g_points数组中
        g_points.push(x);g_points.push(y);

        //清空<canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        var len=g_points.length;
        for(var i =0;i<len;i+=2){
            //将点的位置传递到变量中a_Position
            gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);

            //绘制一个点
            gl.drawArrays(gl.POINTS,0,1);
        }
    }


}