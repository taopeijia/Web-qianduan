#WebGL学习路线

**HTML css JavaScript 之间的关系**   
[https://www.cnblogs.com/feng9exe/p/6126236.html](https://www.cnblogs.com/feng9exe/p/6126236.html)   

**css学习**   
[https://www.w3cschool.cn/css/](https://www.w3cschool.cn/css/)   

**选择器效率从高到低**     
1.id选择器 （#myid）   
```
<style>
#para1
{
	text-align:center;
	color:red;
} 
</style>
</head>

<body>
<p id="para1">Hello World!!!</p>
<p>This paragraph is not affected by the style.</p>
</body>
```  
2.类选择器 （.myclassname） 
```
<style>
.center
{
	text-align:center;
}
</style>
</head>

<body>
<h1 class="center">标题居中</h1>
<p class="center">段落居中。</p> 
</body>
```
3.标签选择器（div,h1,p）
```
body
{
	background-color:#d0e4fe;
}
h1
{
	color:orange;
	text-align:center;
}
p
{
	font-family:"Times New Roman";
	font-size:20px;
}
</style>
</head>

<body>

<h1>CSS 实例!</h1>
<p>这是一个段落。</p>

</body>
```
##Canvas元素学习   
blog学习   
[谷子blog](https://blog.csdn.net/weixin_39452320/article/list/1?t=1)   
顶点 (vector) 顶点着色器VSHADER 
片(fragment) 片着色器FSHADER   
重新开始新的绘制beginPath()   
绘制矩形框 语法：   
```
CanvasRenderingContext2D.strokeRect( x, y, width. height )
 ...//案例
    ctx.strokeStyle = 'red';//样式表达1
    ctx.fillStyle = 'rgba(0,0,255,1.0)//样式表达2
    ctx.strokeRect( 100, 100, 200, 100 );
```
绘制矩形框 语法：   
```
...
    ctx.fillStyle = 'green';
    ctx.fillRect( 100, 100, 200, 100 );
``` 
清除矩形区域 语法：
```
 ...
    ctx.fillRect( 100, 100, 200, 100 );
    ctx.clearRect( 110, 110, 50, 50 );
```  
绘制圆弧 语法：
```
CanvasRenderingContext2D.arc( x, y, radius. startAngle. endAngle, anticlockwise )
```
1. 该方法用于绘制一段弧, 配合开始点的位置 与 stroke 方法或 fill 方法可以绘制扇形.   
2. 方法中的前两个参数 x, y 表示绘制圆弧的圆心坐标.   
3. 参数 radius 表示圆弧半径, 单位为弧度.   
4. 参数 startAngle 与 endAngle 表示开始到结束的角度. 角度以水平向右为 0 弧度, 顺时针为正方向.   
5. 参数 anticlockwise 表示是否采用默认的正向角度, 如果传入 true 表示逆指针为正. 该参数可选   
```
// 在 200, 200 的地方绘制一段半径为 100 的圆弧, 圆心角为 - PI / 2 到 PI / 4
    ...
    ctx.arc( 200, 200, 100, -Math.PI/2, Math.PI/4 );
    ctx.stroke();
```
绘制相切弧   
```
CanvasRenderingContext2D.arcTo( x1, y1, x2, y2, radius )
```
1. 该方法用于绘制圆弧
2. 绘制的规则是当前位置与第一个参考点连线, 绘制的弧与该直线相切.
3. 同时连接两个参考点, 圆弧根据半径与该连线相切
