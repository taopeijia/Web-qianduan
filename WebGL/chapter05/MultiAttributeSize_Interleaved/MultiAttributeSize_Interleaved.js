var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = a_PointSize;\n' +
    '}\n';

//  片元着色器程序
var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);\n' +
    '}\n';

//WebGL程序包括运行在浏览器中的JavaScript和运行在WebGL系统的着色器程序这两个部分
function main() {
    // 查找canvas元素
    var canvas = document.getElementById('webgl');

    // 获取canvas上下文
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // 设置顶点坐标和点的尺寸
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }

    // 设置canvas背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清除canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制3个点，这里是从第1个开始，一共绘制3个（n=3）
    gl.drawArrays(gl.POINTS, 0, n);
}
    function initVertexBuffers(gl) {
        //创建类型化数组的唯一方式是是使用new关键词，否则创建的就是普通数组
        var verticesSizes = new Float32Array([
            0.0, 0.5, 10.0,
            - 0.5, -0.5, 20.0,
            0.5, -0.5, 30.0
        ]);
        var n = 3;//点的个数


        //创建缓冲区对象
        var vertexSizeBuffer = gl.createBuffer();

        if (!vertexSizeBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        //将缓冲区对象绑定到目标
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);

        //像缓冲区对象中写入数据
        gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);
        var FSIZE = verticesSizes.BYTES_PER_ELEMENT;
        //获取a_Position的存储位置，分配缓冲区并重启
        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;
        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);

        //连接a_Position变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_Position);


        var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return;

        }
        //将缓冲区对象分配给a_Position变量
        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);

        //连接a_Position变量与分配给它的缓冲区对象
        gl.enableVertexAttribArray(a_PointSize);
        // 解开缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return n;

}
