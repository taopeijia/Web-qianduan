//HelloCanvas.js


function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('webgl');

    //获取WebGL绘图上下文
    // getWebGLContext()是个函数
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed');
        return;
    }

    //指定清空<canvas>的颜色
    gl.clearColor(0.0,0.0,255,1.0);

    //清空<canvas>
    // gl.COLOR_BUFFER_BIT指的是清空颜色缓冲区，除了颜色缓冲区还包括深度缓冲区和模块缓冲区
    // gl.DEPTH_BUFFER_BIT指的是深度缓冲区
    // gl.STENCLL_BUFFER_BIT指的是模块缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
}