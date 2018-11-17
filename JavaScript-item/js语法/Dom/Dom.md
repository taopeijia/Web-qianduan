##Dom基本概念
//设置id为box的这个元素的文字颜色，属性是减号连接的复合形式时   
//必须转换为驼峰形式   
ele.className是重新设置类，替换元素本身的class   
当要获取标签上默认的属性时，只需要先获取元素，用变量加属性名的方式 除了class   
如果要获取自定义的属性，要用getAttribute加属性名的方式   
什么是事件：事件就是文档或浏览器窗口中发生的一些特定的交互瞬间   
1. HTML事件：直接在HTML元素标签内添加事件，执行脚本   
2. DOM0级事件：语法：ele.事件=执行脚本 功能：在DOM对象上绑定事件 说明：执行脚本可以是一个匿名函数，也可以是一个函数调用   
Js三大事件（鼠标事件、键盘事件、html事件）
[https://blog.csdn.net/qwer_df_b/article/details/77509859]   
拖拉事件   
```
<div draggable="true">
  此区域可拖拉
</div>
```
EventTarget
[https://www.jianshu.com/p/a128d7e0dba5]   
eventPhase   
[https://developer.mozilla.org/zh-CN/docs/Web/API/Event/eventPhase]   
监听函数
https://blog.csdn.net/jquery_qq/article/details/51448842]
##问题
拖拉事件   
WheelEvent接口怎么用？
