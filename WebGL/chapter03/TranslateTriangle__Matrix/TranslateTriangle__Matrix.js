//HelloPoint1.js
//顶点着色器程序
var VSHADER_SOURCE =
    //x' = x cos b - y sin b
    //y' = x sin b + y cos b
    //z' = z
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_xformMatrix;\n' +
    'void main() {\n' +
    ' gl_Position = u_xformMatrix*a_Position;\n' +
    '}\n';

//片元着色器
var FSHADER_SOURCE =
    'void main(){\n' +
    ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +//设置颜色
    '}\n'
//平移距离
var Tx=0.5,Ty=0.5,Tz=0.0;
//缩放大小
var Sx=1.0,Sy=1.5,Sz=1.0;
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
    //创建旋转矩阵
    //var radian = Math.PI*ANGLE/180.0;//转为弧度制
    //var cosB = Math.cos(radian);
    //var sinB = Math.sin(radian);
    //注意WebGL中矩阵是列主序的
    /*var xformMatrix = new Float32Array([
        1.0,0.0,0.0,0.0,
        0.0,1.0,0.0,0.0,
        0.0,0.0,1.0,0.0,
        Tx,Ty,Tz,1.0
    ]);*/
    var xformMatrix = new Float32Array([
        Sx,0.0,0.0,0.0,
        0.0,Sy,0.0,0.0,
        0.0,0.0,Sz,0.0,
        0.0,0.0,1.0,1.0
    ]);
    //将旋转图形所需的数据传输给顶点着色器
    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');

    if(u_xformMatrix<0){
        console.log('Failed to get the storage translocation of u_xformMatrix');
        return;
    }
    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);

    //设置<canvas>背景色
    gl.clearColor(0.0,0.0,0.0,1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制三角形
    gl.drawArrays(gl.TRIANGLES,0,n);//n is 3
    function initVertexBuffers() {
        //创建类型化数组的唯一方式是是使用new关键词，否则创建的就是普通数组
        var vertices = new Float32Array([
            0.0,0.5,-0.5,-0.5,0.5,-0.5
        ]);
        var n =3;//点的个数

        //创建缓冲区对象
        var vertexBuffer = gl.createBuffer();
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
        return n;
    }
}