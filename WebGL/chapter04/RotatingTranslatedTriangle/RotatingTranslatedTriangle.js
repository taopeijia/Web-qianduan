//HelloPoint1.js
//顶点着色器程序
var VSHADER_SOURCE =
    //x' = x cos b - y sin b
    //y' = x sin b + y cos b
    //z' = z
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    ' gl_Position = u_ModelMatrix*a_Position;\n' +
    '}\n';

//片元着色器
var FSHADER_SOURCE =
    'void main(){\n' +
    ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +//设置颜色
    '}\n'
//旋转速度(度/秒)
var ANGLE_STEP = 45.0;

//WebGL程序包括运行在浏览器中的JavaScript和运行在WebGL系统的着色器程序这两个部分
function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');

    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for webGL');
        return;
    }

    //初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    //设置顶点的位置
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    //设置<canvas>背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //将旋转图形所需的数据传输给顶点着色器
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

    if (u_ModelMatrix < 0) {
        console.log('Failed to get the storage translocation of u_ModelMatrix');
        return;
    }
    //三角形的当前旋转角度
    var currentAngle = 0.0;
    //创建Matrix4对象以进行模型变换
    var modelMatrix = new Matrix4();
    //开始绘制三角形
    var tick = function () {
        currentAngle = animate(currentAngle);//更新旋转角
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);//请求浏览器调用tick
    };
    tick();

    function initVertexBuffers() {
        //创建类型化数组的唯一方式是是使用new关键词，否则创建的就是普通数组
        var vertices = new Float32Array([
            0.0, 0.25, -0.25, -0.25, 0.25, -0.25
        ]);
        var n = 3;//点的个数

        //创建缓冲区对象
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        //像缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        //连接a_Position变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_Position);
        return n;

    }

    function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
        //设置旋转矩阵
        modelMatrix.setRotate(currentAngle, 0, 0, 1);
        modelMatrix.translate(0.35,0,0);
        //将旋转矩阵传给顶点着色器
        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

        //清空<canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);

        //绘制三角形
        gl.drawArrays(gl.TRIANGLES, 0, n);//n is 3
    }
}
//记录上一次调用函数的时刻
var g_last = Date.now();

function animate(angle) {
    //计算距离上次调用的时间
    var now = Date.now();
    var elapsed = now - g_last;//毫秒
    g_last = now;
    //根据距离上次调用的时间，更新当前旋转角度
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}








