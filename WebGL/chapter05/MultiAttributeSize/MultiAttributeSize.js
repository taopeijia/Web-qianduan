//HelloPoint1.js
//顶点着色器程序
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

    //设置顶点的位置
    var n =initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to set the positions of the vertices');
        return;
    }
    //设置<canvas>背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三个点
    gl.drawArrays(gl.POINTS,0,n);//n is 3
    function initVertexBuffers() {
        //创建类型化数组的唯一方式是是使用new关键词，否则创建的就是普通数组
        var vertices = new Float32Array([
            0.0,0.5,-0.5,-0.5,0.5,-0.5
        ]);
        var n =3;//点的个数

        var sizes = new Float32Array([
           10.0,20.0,30.0//点的尺寸
        ]);
        //创建缓冲区对象
        var vertexBuffer = gl.createBuffer();
        var sizeBuffer = gl.createBuffer();
        if(!vertexBuffer){
            console.log('Failed to create the buffer object');
            return -1;
        }

        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

        //像缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(gl.program,'a_Position');
        if(a_Position<0){
            console.log('Failed to get the storage location of a_Position');
            return;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

        //连接a_Position变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_Position);
        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);

        //像缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER,sizes,gl.STATIC_DRAW);

        var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
        if(a_Position<0){
            console.log('Failed to get the storage location of a_Position');
            return;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,0,0);

        //连接a_Position变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_PointSize);

        return n;
    }
}