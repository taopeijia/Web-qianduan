##JavaScript基本概念
DOM,Document Object Model,文档对象模型   
是针对XML但经过扩展用于HTML的应用程序编程接口   
标签的位置 所有（script）元素放在body中，这是因为如果放在head中，
那么，网页会先加载head里的所有脚本，并解析，和执行完以后才开始执行下面的文件   
（浏览器在遇到(body)标签时才开始呈现内容）   
// 单行注释   
/*   
 *多行注释   
 */   
 开启严格模式   
 ```
 function doSomething()
 {
    "use strict"
    //函数体
 }  
 ```
 Undefined类型   只有一个值就是undefined
 null类型，只有一个值null，一般未赋值的变量会给一个null以区分undefined类型
 方便一些操作
 ```
 if(car !=null){
    //对car进行某些操作
 }  
 ```
 Boolean类型 只有两个值：true和false   
 隐式类型转换 isNaN  和算数操作符+-*%都会进行 
   
 逻辑与 （在有一个操作数不是布尔值的情况下，逻辑与就不一定返回值）  
 1. 如果第一个操作数隐式类型转换结果为true，则返回第二个操作数，如果有多个，则返回最后一个操作数
 2. 如果第一个操作数隐式类型转换结果为false，则返回第一个操作数 
 3. 如果有一个操作数是null，则返回null
 4. 如果有一个操作数是NaN,则返回NaN
 5. 如果有一个数是undefined，则返回undefined
 逻辑或
 1. 如果第一个操作数隐式类型转换后为true，则返回第一个操作数
 2. 如果第一个数隐式类型转换为false，则返回第二个操作数，依次往后类推 
 3. 如果有两个操作数是null，则返回null
 4. 如果有两个操作数是NaN,则返回NaN
 5. 如果有两个数是undefined，则返回undefined
 逻辑非
 1. 无论操作的是什么类型，逻辑非都会返回一个bool值
 2. ！！就是两次求反，返回一个bool值
 
 **NaN和任何内容都不相等，包括它本身
 
 break直接退出整个循环体
 continue 退出本次 再进行下依稀循环
 return 退出当前当前函数   
 ###用new的地方   
 var week = new Date().getDay();   
 new Array();
 函数申明
 [https://www.cnblogs.com/lunawzh/p/5274474.html]   
 函数属性和方法
 [https://www.cnblogs.com/xiaohuochai/p/5707378.html]   
 函数作用域
 [https://www.cnblogs.com/xiaohuochai/p/5700095.html]
 [https://blog.csdn.net/u014328357/article/details/52763448] 
 [https://www.cnblogs.com/oxiaojiano/p/7918967.html]  
 函数作用域是指：属于这个函数的全部变量都可以在整个函数的范围内使用及复用，但是无法从函数作用域的外部访问，也就是无法从全局作用域访问。   
 函数内部变量提升
 [https://blog.csdn.net/weixin_41702247/article/details/81538280]   
 1.函数内外有重名的变量时，局部变量会覆盖全局变量，原因是函数域优先于全局域
 
 2.当js执行进入函数时，函数内部声明过的所有变量会被提到最前，但同时对变量的赋值等操作不会被提升
 ```
 var a=123;
 function test(){
     alert(a);   //undefined
     var a=1;
     alert(a);   //1
 }
 test();
 ```
 函数参数
 [https://blog.csdn.net/liu_shi_jun/article/details/51967436]      
 键值对写法
 ```
 var obj = {"a":11,"b":12   };
 console.log(obj);
 ```
 [https://blog.csdn.net/xiaoye319/article/details/78365217]   
 对象属性的赋值   
 [https://www.cnblogs.com/Ziksang/p/5186662.html]   
 in 运算符   
 [https://www.cnblogs.com/jf-67/p/6504270.html]   
 for in 运算符   
[https://www.cnblogs.com/wujie520303/p/4931384.html]    
js中对象和函数的区别      
[https://zhidao.baidu.com/question/2138073798553571188.html]   
原型链 
```   
function Person() {

    }
    var person = new Person();
    Person.prototype.name='Tao';
    console.log(person.name);
    person.name = 'Kevin';
    console.log(person.name);
    delete person.name;
    console.log(person.name);
    console.log(person.__proto__===Person.prototype);
    console.log(Person.prototype.__proto__ === Object.prototype);
    console.log(Object.prototype.__proto__);
```  
[https://juejin.im/post/5a4053d0f265da432a7bcdee]   
[https://juejin.im/entry/5883672c570c350062be16e5]
[https://blog.csdn.net/liona_koukou/article/details/72932557]    
###JavaScript的组成
---   
静态方法和实例方法的区别   
[https://www.cnblogs.com/faithZZZ/p/7045323.html]
完整的JavaScript是由ECMScript（语法）Browser Objects（DOM、BOM）(特性)组成的   
**Array对象**   
[http://www.w3school.com.cn/jsref/jsref_obj_array.asp]
[https://blog.csdn.net/born_in_spring/article/details/82630679]   
1. valueOf: 返回数组对象的原始值   
2. toString: 把数组转换为字符串，并返回结果。   
3. join: 把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。   
4. push: 向数组的末尾添加一个或更多元素，并返回新的长度。   
5. pop: 除并返回数组的最后一个元素   
6. Array.prototype.map()方法：对数组中的每一项运行给定函数，返回运行结果组成的数组。   
7. foreach()[https://www.cnblogs.com/alantao/p/5874698.html]
8. indexof: 查找数组中有没有某个元素   
Number:   
[https://www.cnblogs.com/qilinge/p/5248519.html]   
JavaScript String 对象   
[https://www.cnblogs.com/sntetwt/p/3599756.html]
   
fetch:
[https://blog.csdn.net/weixin_41000111/article/details/79414042]   
bootstrap和jquery区别
[https://blog.csdn.net/detergent/article/details/79061557]   
关于js中的同步和异步
[https://www.cnblogs.com/c3gen/p/6170504.html]    
闭包   
[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures]   
回调   
[https://segmentfault.com/a/1190000009391074]   
Promise   
[https://www.jianshu.com/p/fe5f173276bd]   
this   
[https://www.w3cschool.cn/vnpqd/vnpqd-v6p525sf.html]    
跨域问题解决   
[https://www.cnblogs.com/chenshishuo/p/4919224.html]   
javascript实现映射   
[https://blog.csdn.net/m0_37582289/article/details/83477935]         
问题：什么是映射 


  

  