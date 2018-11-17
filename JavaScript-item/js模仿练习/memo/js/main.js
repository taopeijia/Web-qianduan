//输入框
var input =document.getElementById("input");
//红色提示
var main_hint = document.getElementsByClassName("main_hint")[0];
//主体部分
var main_context=document.getElementById("main_content");
//添加的部分
var main_p=main_context.getElementsByTagName("p");
//大大的按钮
var btn_remove_bg=document.getElementById("btn_remove_bg");
//多选和取消
var choice =document.getElementById("choice");
var cancel =document.getElementById("cancel");
//多选框
var main_check = document.getElementsByName('check');
//var main_check = document.querySelector()

//增加方法
function add() {
    var input_value = input.value;
    if(input_value ==""){
        alert("请输入内容");
        return;
    }
    //input_value = $("#input").val();
    var content = document.createElement("p");
    if(choice.style.display == "none"){
        content.innerHTML = "<input type='checkbox' class='show checkbox' name='check'/>"+input_value +
            "<button class='btn_remove' onclick='remove(this)'>删除</button>";}
        else{
            content.innerHTML="<input type='checkbox' class='hide checkbox' name='check'/>"+input_value+
                "<button class='btn_remove' onclick='remove(this)'>删除</button>";
        }
        main_context.appendChild(content);
        input.value="";
        main_hint_change();

}
/*红色提示，显示与隐藏切换*/
function main_hint_change() {
    if(main_context.childElementCount>1){
        main_hint.className="hide main_hint";
    }else{
        main_hint.className ="show main_hint";
    }
}
//单个删除
function remove(obj) {
    obj.parentNode.parentNode.removeChild(obj.parentNode);
    main_hint_change();
}
//多选，取消切换
function change(status) {
    choice.style.display = status?"none":"block";
    cancel.style.display = status?"block":"none";
    btn_remove_bg.style.display = status?"block":"none";

    for(var i=0;i<main_check.length;i++){
        main_check[i].className=status?'show checkbox':'hide checkbox';
    }
}
//批量删除
function remove_check() {
    for(var i=0;i<main_check.length;i++){
      if(main_check[i].checked){
          remove(main_check[i]);
          i--;
      }
    }
    main_hint_change();
}