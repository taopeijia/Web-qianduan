/*console.log('123');
console.table('456');*/
//alert(789);
//var message = "some thing";
/*
alert(typeof message);
alert(typeof (message));
alert(typeof 95)*/
/*var message;
var age;
alert(typeof message);
alert(typeof age);*/
/*
var car=null;
alert(typeof car);
if(car != null)
{

}
alert(null ==undefined);*/
/*var message = "HelloWorld";
var messageAsBoolean = Boolean(message);
alert(messageAsBoolean);*/
/*
var c ="12ab"
console.log(parseInt("16xf",16));
var age = prompt("请输入您的年龄");*/
/*var week = new Date().getDay();
console.log(week);
var weekstr="";
switch (week){
    case 0:
        weekstr = "日";
        break;
    case 1:
        weekstr = "一";
        break;
    case 2:
        weekstr = "二";
        break;

}
document.write("今天是星期"+weekstr);
for(var i = 1;i<=100;i++)
{
    document.write(i+"<br />");

}
function myFun() {
    console.log(arguments.length);

}
myFun(5,10,15);*/
/*
var arr = new Array("a","b","c");
console.log(arr.length);*/
/*function test(){
    alert("" + this);
}

function testTwo(a){
    console.log("this:"+this);
    console.log("a:"+a);
}

testTwo.apply(test, [1]);
setTimeout( function timeoutHandler() { // <-- 快看，有名字了!
    console.log( "I waited 1 second!" );
}, 1000 );*/

/*console.log(a);  // f a() { console.log(a) }
console.log(b); //undefined

function a() {
    console.log(a);
}

var b = function(){
    console.log(b);
var b = "v3";*/
/*var obj = {a:11,b:12   };

obj.c='13';
obj.a = 45;
delete (obj["c"]);
console.log(obj.a);*/
       /*var obj ={
               username:"ziksang",
               age:22,
               addr:"北京",
               say:function(){
                   return "我的名字叫 "+this.username   //解析this，此处的this是指向obj对象，只是在方法say中调用了obj的属性，所以用this.obj来索引
               }
      };
        alert(obj.username);   //查询对象属性可以用对象.属性
        alert(obj["addr"]);    //还可以用对象["属性"]
        var key="age" ;      //当不确定属性的时候把属性赋值给一个变量
        alert(obj[key]);    //调用时可以用obj[变量]  alert(obj.say())    //查询属性方法时可以用obj.属性（）
        alert(obj.say());*/
//4.原型模式，直接定义prototype属性
/*
function Person () {}
Person.prototype.name = 'Jack';
Person.prototype.age = 18;
Person.prototype.sayName = function () { alert(this.name); };
//4.原型模式，字面量定义方式
function Person () {}
Person.prototype = {
    name: 'Jack',
    age: 18,
    sayName: function () { alert(this.name); }
};
var p1 = new Person(); //name='Jack'
var p2 = new Person(); //name='Jack'
console.log(p1.name);*/
