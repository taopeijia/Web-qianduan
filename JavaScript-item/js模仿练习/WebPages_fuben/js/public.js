
var path = "http://www.daicy.net/daicy";
/*var seturl ="../../interim"+getSiteUrl();//资源路径*/

/*function jump(e) {
   var id_a = "#" + $(e).prop('name');
   sessionStorage.setItem("scrollId",id_a);
   if($(id_a).size()>0){
   	_top = Math.floor($(id_a).offset().top-151);
       $('html,body').animate({
           scrollTop : _top
       },300);
   }
}*/
function download2(e){
    var sourceFileName = $(e).attr("path");
    var name=encodeURI(encodeURI(decodeURI(sourceFileName)));
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        window.location.href=path + "/file/download?type=0&path="
            + name+ "&isCompress=" + false+"&ie=1";
    } else {
        window.open(path + "/file/download?type=0&path="
            + name+ "&isCompress=" + false+"&ie=0");
    }
}
function jump(e) {
    var id_a = "#" + $(e).prop('name');
    sessionStorage.setItem("scrollId",id_a);
    if($(id_a).size()>0){
        _top = Math.floor($(id_a).offset().top-151);
        $('html,body').animate({
            scrollTop : _top
        },300);
    }else{
        var htmls=$(e).attr("data_add")+'.html'+id_a;
        $(e).attr("href",htmls);
    }
}
function go(e){
    var name_e=$(e).prop('name');
    var id_a="#"+name_e.split("#")[1];
    sessionStorage.setItem("scrollId",id_a);
    if($(id_a).size()>0){
        _top = Math.floor($(id_a).offset().top-151);
        $('html,body').animate({
            scrollTop : _top
        },300);
    }
}



/*详情页*/
function loads(e){
    var num=$(e).attr('value');
    src=$(e).attr('name')+'.html?num='+num;
//    alert(src);
    window.location.href=src;
}
//提示模态框
function modal(title,main){
    $("body").append("<div id='tisModal' class='modal fade' aria-hidden='true'>"
        +"<div class='modal-dialog'>"
        +"<div class='modal-content'>"
        +"<div class='modal-header clearfix'>"
        +"<button type='button' class='close' data-dismiss='modal' aria-hidden='true'><span aria-hidden='true'>&times;</span></button>"
        +"<h4 class='modal-title'>"+title+"</h4>"
        +"</div>"
        +"<div class='modal-body'>"
        +"<p>"+main+"</p>"
        +"</div>"
        +"<div class='modal-footer'>"
        +"<button type='button' class='btn btn-default' data-dismiss='modal' id='que'>确认</button>"
        +"</div>"
        +"</div></div></div>");
    $("#tisModal").modal('show');
    $('#tisModal').off('hidden.bs.modal');
    $('#tisModal').on('hidden.bs.modal',function() {
        $("body #tisModal").remove();
    });
}

//$("#tisModal").modal('hide');
function str(txt,num,smallNum){
    txt =removeHTMLTag(txt);
    var test='';
    //限制字符个数
    String.prototype.len = function()
        // 给string增加个len ()方法，计算string的字节数
    {
        return this.replace(/[^\x00-\xff]/g, "**").length;
    };
    var windowWidth = $(window).width();
    if(windowWidth < 640){
        if(txt.len()>smallNum){
            if(txt.len()!=txt.length){
                test=txt.substring(0,parseInt((smallNum)/2))+'...';
            }else{
                test=txt.substring(0,smallNum)+'...';
            }
            return test;
        }else{
            return txt;
        }
    }

    if(windowWidth >= 640){
        if(txt.len()>num){
            if(txt.len()!=txt.length){
                test=txt.substring(0,parseInt((num)/2))+'...';
            }else{
                test=txt.substring(0,num)+'...';
            }
            return test;
        }else{
            return txt;
        }
    }
}


function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}
$(function(){
    $('.layouts').on('mouseover mouseout','.systems-btn>button',function(e){
        if(e.type == "mouseover"){
            $(this).addClass('hover');
        }else if(e.type == "mouseout"){
            $(this).removeClass('hover');
        }
    });
    $('.market-btn button').mouseover(function(){
        $(this).addClass('hover');
    }).mouseout(function(){
        $(this).removeClass('hover');
    });
    $('.look-btn>button').mouseover(function(){
        $(this).addClass('bghover');
    }).mouseout(function(){
        $(this).removeClass('bghover');
    });
    /*侧边楼梯*/
    $('.fixed-nav').on('mouseover mouseout',' li a',function(e){
        if(e.type == "mouseover"){
            if(!$(this).hasClass('red-square')){
                $(this).next().show();
            }
        }else if(e.type == "mouseout"){
            if(!$(this).hasClass('red-square')){
                $(this).next().hide();
            }
        }
    });

    //侧边导航楼梯
    var config={
        indent:138,//楼梯向下偏移118px
        step:$('.step'),//楼梯节点
        fixNav:$('.sidebar'),//侧边栏导航
        //fixNavShowHeight:0 //滚动距离显示侧边导航
    };

    var Step=function (obj){
        this.steps=obj.step;
        this.fixNav=obj.fixNav;
        this.navButton=$('.louti',this.nav);
        this.indent=obj.indent;
        //this.fixNavShowHeight=obj.fixNavShowHeight;
        this.scrollTop=0;
        this.heightArray=[];
    };
    Step.prototype={
        init:function(){
            this.scrollEvent();
            this.clickEvent();
        },
        scrollEvent:function(){
            var that=this;
            // 如果每个组件高度随时变化将之放入滑动事件内
            this.getHeight();
            $(window).scroll(function() {
                that.show();
                that.navRender();
            });
        },
        show:function(){
            this.scrollTop=$(document).scrollTop();

            // 固定导航
            /*if(this.scrollTop>=this.fixNavShowHeight){
                this.fixNav.show()
            }else{
                this.fixNav.hide()
            }*/
        },
        navRender:function(){
            var that=this;
            var maxHeight,minHeight;
            $.each(this.heightArray,function(i,v){
                maxHeight=(i==that.heightArray.length-1)?$(document).height()-that.indent:that.heightArray[i+1]-that.indent;
                minHeight=v-that.indent;
                if(that.scrollTop>= minHeight&& that.scrollTop<maxHeight){
                    that.navButton.eq(i).addClass("red-square");
                    that.navButton.eq(i).next().show();

                }else{
                    that.navButton.eq(i).removeClass("red-square");
                    that.navButton.eq(i).next().hide();
                }
                /* console.log(maxHeight,-that.scrollTop,-minHeight);*/
            })

        },
        getHeight:function(){
            var that=this;
            if(this.steps.length>0){
                $.each(this.steps,function(i,v){
                    that.heightArray[i]=$(v).offset().top-that.indent;
                    /*      console.log($(v).offset().top)*/
                });

            }

        },
        clickEvent:function(){
            var that=this;
            $.each(this.navButton,function(i,v){
                (function(i,v){
                    $(v).on('click',function(){
                        that.getHeight();
                        $("body,html").animate({scrollTop:(that.heightArray[i])},300);
                    });
                })(i,v);
            });
        }

    };
    var step=new Step(config);
    step.init();

});
function getTypes(content_type){
    var map = {};
    map["主题介绍"] = "Zt_Js";
    map["公司介绍"] = "Gs_Js";
    map["汽车制造"] = "Qc_Zz";
    map["航空航天"] = "Hk_Ht";
    map["道路安全"] = "Dl_Aq";
    map["兵器船舶"] = "Bq_Cp";
    map["智能工业"] = "Zn_Zz";
    map["能源工业"] = "Hgy";
    map["石油化工"] = "Sy_Hg";
    map["科研机构"] = "Ky_Jg";
    map["芯片设计"] = "Xi_Pi";
    map["软件"] = "Rj";
    map["数据"] = "Sj";
    map["系统"] = "xT";
    map["平台"] = "Pt";
    map["高性能计算集群系统咨询"] = "Qc_Gc_Zx";
    map["可视化设计云平台咨询"] = "Dl_Aq_Zx";
    map["企业研发云平台咨询"] = "Fz_Ql_Zx";
    map["企业研发数据管理咨询"] = "CAE_Zx";
    map["企业知识库管理系统咨询"] = "Xn_Xt_Zx";
    map["BIM信息化咨询"] = "min";
    map["内容栏"] = "NrL";
    map["文字模块"] = "Wz_Mk";
    map["输入框"] = "Srk";
    map["文本域"] = "Wby";
    map["勾选框"] = "Gxk";
    map["商业合作伙伴"] = "Sy_Hb";
    map["服务合作伙伴"] = "Fw_Hb";
    map["软件合作伙伴"] = "Rj_Hb";
    map["详细说明"] = "Xx_message";
    map["主题介绍二"] = "Zt_Js2";
    map["图文宣传"] = "Tw_Xc";
    map["关于戴西"] = "Gy_Daicy";
    map["产品与数据"] = "Cp_Sj";
    map["技术与支持"] = "Js_Zc";
    map["戴西投资"] = "Daicy_Tz";
    map["联系我们-TEL"] = "Lx_We";
    var type=map[content_type];
    return type;
}
//根据模块查询出每个类型和条数
function getTypeByModule(content_module){
    var type="";
    if(content_module=="nr"){
        type="Zt_Js,Gs_Js";
    }
    if(content_module=="hy"){
        type="Qc_Zz:6,Hk_Ht:4,Dl_Aq:6,Bq_Cp:6,Zn_Zz:6,Hgy:4,Sy_Hg:6,Ky_Jg:4,Xi_Pi:4";
    }
    if(content_module=="rx"){
        type="Rj:4,Sj:6,xT:5,Pt:4";
    }
    if(content_module=="zx"){
        type="Qc_Gc_Zx:1,Dl_Aq_Zx:1,Fz_Ql_Zx:1,CAE_Zx:1,Xn_Xt_Zx:1,bim:1";
    }
    if(content_module=="hb"){
        type="hb_Zt_Js:1,yj_Hz_Hb:5,rj_Hz_Hb:5,pt_Hz_Hb:5";
    }
    if(content_module=="js_Zt_Js"){
        type="js_Zt_Js:0";
    }
    if(content_module=="js_Gs_Js"){
        type="js_Gs_Js:0";
    }
    if(content_module=="js"){
        type="js_Zt_Js:1,js_Gs_Js:0";
    }
    if(content_module=="dh"){
        type="Gy_Daicy:4,rj_xt:5,Js_Zc:4,Daicy_Tz:4,Lx_We:1";
    }
    return type;
}
//获取背景图片路径
function getBackgroudName(type){
    $.ajax({
        url : path+ "/content/findBackgroud",
        type :"get",
        dataType : "json",
        data :{
            type : type,
        },
        success : function(result){
            var data = result.data;
            // console.log(data);
            for(var i=0;i<data.length;i++){
                if(data[i].type_num=="LG1"){
                    $("img[name='logo1White']").attr("src",seturl+"/"+data[i].background_img);
                }else if(data[i].type_num=="LG2"){
                    $("img[name='logo2Red']").attr("src",seturl+"/"+data[i].background_img);
                }else if(data[i].type_num=="WM"){
                    $("#erweima").attr("src",seturl+"/"+data[i].background_img);
                }else{
                    $("#bgImgOncheange").css('background','url('+seturl+"/"+data[i].background_img+')');
                    $("#bgImgOncheange").addClass("bgdaicyimage");
//					$("#bgImgOncheange").css('background','url('+seturl+"/"+data[i].background_img+') no-repeat center center');
                }
            }
        }
    });
}
function getUrl(navigation){
    var map = {};
    map["首页"] = "index.html";
    map["行业"] = "industry.html";
    map["软件与系统"] = "software.html";
    map["工程咨询"] = "product.html";
    map["技术支持"] = "technical.html";
    map["如何购买"] = "buy.html";
    map["合作伙伴"] = "partner.html";
    map["新闻与动态"] = "newDetails.html";
    var Url=map[navigation];
    return Url;
}
//抓取站点信息 标头和标题
function getSiteSet(nav_type){
    $.ajax({
        url:path+"/site/findSiteSet",
        type:"post",
        dataType:"json",
        success:function(result){
            var siteset=result.data;
            var html='';
            if (result.status== 1) {
                var navigation=siteset.navigation.split(",");
                for (var i = 0; i < navigation.length; i++) {
                    if(navigation[i]==nav_type){
                        html+='<li Class="active1" ><a href="'+getUrl(navigation[i])+'">'+navigation[i]+'</a></li>';
                    }else{
                        html+='<li><a href="'+getUrl(navigation[i])+'">'+navigation[i]+'</a></li>';
                    }
                }
                $("#example-navbar-collapse ul").html(html);

                var html1="";
                for (var i = 0; i < navigation.length; i++) {
                    if(navigation[i]==nav_type){
                        html1+='<li Class="active2" ><a href="'+getUrl(navigation[i])+'">'+navigation[i]+'</a></li>';
                    }else{
                        html1+='<li><a href="'+getUrl(navigation[i])+'">'+navigation[i]+'</a></li>';
                    }
                }
                $("#navbar-nav2 ul").html(html1);
                $("#example-navbar-collapse ul li:last-child a").addClass('last-li');
                $("#navbar-nav2 ul li:last-child a").addClass('last-li');
                $("#titleid").html(siteset.sitename);
                $(".p1").html(siteset.site_set);
                $("#p5").html(siteset.copyright_message);
                $('meta[name="keywords"]').attr("content",siteset.keyword);
                $('meta[name="description"]').attr("content",siteset.remark);
            }else{
                $("#titleid").html();
                $(".p1").html();
            }
        }
    });
}
//底部导航
function footer(module) {
    var types = getTypeByModule(module);
    $.ajax({
        url : path + "/content/findPageTypeList",
        dataType : "json",
        type : "post",
        data : {
            "content_type" : types
        },
        success : function(result) {
            var list=result.data;
            var html="";
            var html1="";
            var html2="";
            var html3="";
            var html4="";
            html+='<dt><h3>关于戴西</h3></dt>';
            html1+='<dt><h3>软件与系统</h3></dt>';
            html2+='<dt><h3>技术与支持</h3></dt>';
            html3+='<dt><h3>戴西投资</h3></dt>';
            if (result.status == 0) {
            } else {
                if(list[0]){
                    for (var i = 0; i < list[0].length; i++) {
                        html+='<dd><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[0][i].content_number+'">'+list[0][i].content_title+'</a></dd>';
                    }
                }
                $("#gydaicy").html(html);
                /*if(list[1]){
                    for (var i = 0; i < list[1].length; i++) {
                        html1+='<dd><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[1][i].content_number+'">'+list[1][i].content_title+'</a></dd>';
                    }
                }
                $("#cpsj").html(html1);*/
                if(list[2]){
                    for (var i = 0; i < list[2].length; i++) {
                        html2+='<dd><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[2][i].content_number+'">'+list[2][i].content_title+'</a></dd>';
                    }
                }
                $("#jszc").html(html2);
                if(list[03]){
                    for (var i = 0; i < list[3].length; i++) {

                        if(list[3][i].content_number == 3732){
                            html3+='<dd><a href="http://www.daicy.com.cn/" target="_blank" name="news" value="'+list[3][i].content_number+'">'+list[3][i].content_title+'</a></dd>';
                        }else{
                            html3+='<dd><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[3][i].content_number+'">'+list[3][i].content_title+'</a></dd>';

                        }
                    }
                }
                $("#daicytz").html(html3);
                if(list[4]){
                    for (var i = 0; i < list[4].length; i++) {
                        html4+=list[4][i].content;
                    }
                }
                $("#LxWe").html(html4);
            }
        }
    });
}
//底部导航
function footer2(module) {
    var types = getTypeByModule(module);
    $.ajax({
        url : path + "/content/findPageTypeList",
        dataType : "json",
        type : "post",
        data : {
            "content_type" : types
        },
        success : function(result) {
            var list=result.data;
            var html="";
            html+='<dt><h3>软件与系统</h3></dt>';
            if (result.status == 0) {
            } else {
                if(list[0]){
                    for (var i = 0; i < list[0].length; i++) {
                        html+='<dd><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[0][i].content_number+'">'+list[0][i].content_title+'</a></dd>';
                    }
                }
                $("#cpsj").html(html);
            }
        }
    });
}
////底部导航
//function footer(module) {
//	var types = getTypeByModule(module);
//	$.ajax({
//		url : path + "/content/findPageTypeList",
//		dataType : "json",
//		type : "post",
//		data : {
//			"content_type" : types
//		},
//		success : function(result) {
//			var list=result.data;
//			var html="";
//			var html1="";
//			var html2="";
//			var html3="";
//			var html4="";
//			html+='<li><h3>关于戴西</h3></li>';
//			html1+='<li><h3>产品与数据</h3></li>';
//			html2+='<li><h3>技术与支持</h3></li>';
//			html3+='<li><h3>戴西投资</h3></li>';
//			if (result.status == 0) {
//			} else {
//				if(list[0]){
//					for (var i = 0; i < list[0].length; i++) {
//						html+='<li><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[0][i].content_number+'">'+list[0][i].content_title+'</a></li>';
//					}
//				}
//				$("#gydaicy").html(html);
//				if(list[1]){
//					for (var i = 0; i < list[1].length; i++) {
//						html1+='<li><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[1][i].content_number+'">'+list[1][i].content_title+'</a></li>';
//					}
//				}
//				$("#cpsj").html(html1);
//				if(list[2]){
//					for (var i = 0; i < list[2].length; i++) {
//						html2+='<li><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[2][i].content_number+'">'+list[2][i].content_title+'</a></li>';
//					}
//				}
//				$("#jszc").html(html2);
//				if(list[03]){
//					for (var i = 0; i < list[3].length; i++) {
//						html3+='<li><a href="javascript:void(0)" onclick="loads(this);" name="news" value="'+list[3][i].content_number+'">'+list[3][i].content_title+'</a></li>';
//					}
//				}
//				$("#daicytz").html(html3);
//				if(list[4]){
//					for (var i = 0; i < list[4].length; i++) {
//						html4+=list[4][i].content;
//					}
//				}
//				$("#LxWe").html(html4);
//			}
//		}
//	});
//}

//获取站点动态设置的路径
function getSiteUrl(){
    var siteurl="";
    /*$.ajax({
        url:path+"/site/findSiteSet",
        type:"post",
        dataType:"json",
        async:false,
        success:function(result){
            var siteSet=result.data;
            siteurl=siteSet.upload_url;
        }
    });*/
    return siteurl;
}
/**
 *
 * 获取模块类型
 * @param content_type
 * @returns
 */
function getType(content_type){
    var map = {};
    map["Zt_Js"] = "主题介绍";
    map["Gs_Js"] = "公司介绍";
    map["Qc_Zz"] = "汽车制造";
    map["Hk_Ht"] = "航空航天";
    map["Dl_Aq"] = "道路安全";
    map["Bq_Cp"] = "兵器船舶";
    map["Zn_Zz"] = "智能工业";
    map["Hgy"] = "能源工业";
    map["Sy_Hg"] = "石油化工";
    map["Ky_Jg"] = "科研机构";
    map["Xi_Pi"] = "芯片设计";
    map["Rj"] = "软件";
    map["Sj"] = "数据";
    map["xT"] = "系统";
    map["Pt"] = "平台";
    map["Qc_Gc_Zx"] = "高性能计算集群系统咨询";
    map["Dl_Aq_Zx"] = "可视化设计云平台咨询";
    map["Fz_Ql_Zx"] = "企业研发云平台咨询";
    map["CAE_Zx"] = "企业研发数据管理咨询";
    map["Xn_Xt_Zx"] = "企业知识库管理系统咨询";
    map["bim"] = "BIM信息化咨询";
    map["NrL"] = "内容栏";
    map["Wz_Mk"] = "文字模块";
    map["Srk"] = "输入框";
    map["Wby"] = "文本域";
    map["Gxk"] = "勾选框";
    map["Xx_message"] = "详细说明";
    map["Zt_Js2"] = "主题介绍二";
    map["Tw_Xc"] = "图文宣传";
    map["Gy_Daicy"] = "关于戴西";
    map["Cp_Sj"] = "产品与数据";
    map["rj_xt"] = "软件与系统";
    map["Js_Zc"] = "技术与支持";
    map["Daicy_Tz"] = "戴西投资";
    map["Lx_We"] = "联系我们-TEL";
    map["js_Zt_Js"] = "主题介绍";
    map["js_Gs_Js"] = "公司介绍";
    map["hb_Zt_Js"] = "主题介绍";
    map["rj_Hz_Hb"] = "软件合作伙伴";
    map["yj_Hz_Hb"] = "硬件合作伙伴";
    map["pt_Hz_Hb"] = "平台合作伙伴";
    map["xw_dt"] = "新闻与动态";
    var type=map[content_type];
    return type;
}

function getBG(content_type){
    var map = {};
    /*map["Zt_Js"] = "主题介绍";
    map["Gs_Js"] = "公司介绍";*/
    map["Qc_Zz"] = "../images/Qc_Zz.png";
    map["Hk_Ht"] = "../images/Hk_Ht.png";
    /*map["Dl_Aq"] = "道路安全";*/
    map["Bq_Cp"] = "../images/Bq_Cp.png";
    map["Zn_Zz"] = "../images/Zn_Zz.png";
    map["Hgy"] = "../images/Hgy.png";
    /*map["Sy_Hg"] = "石油化工";*/
    map["Ky_Jg"] = "../images/Ky_Jg.png";
    map["Xi_Pi"] = "../images/Xi_Pi.png";
    map["Rj"] = "../images/industry-bg.png";
    /*map["Sj"] = "数据";*/
    map["xT"] = "../images/industry-bg.png";
    map["Pt"] = "../images/industry-bg.png";
    map["Qc_Gc_Zx"] = "../images/Gc_Zx.png";
    map["Dl_Aq_Zx"] = "../images/Gc_Zx.png";
    map["Fz_Ql_Zx"] = "../images/Gc_Zx.png";
    map["CAE_Zx"] = "../images/Gc_Zx.png";
    map["Xn_Xt_Zx"] = "../images/Gc_Zx.png";
    map["bim"] = "../images/Gc_Zx.png";
    /*map["NrL"] = "内容栏";
    map["Wz_Mk"] = "文字模块";
    map["Srk"] = "输入框";
    map["Wby"] = "文本域";
    map["Gxk"] = "勾选框";
    map["Xx_message"] = "详细说明";
    map["Zt_Js2"] = "主题介绍二";
    map["Tw_Xc"] = "图文宣传";*/
    map["Gy_Daicy"] = "../images/about.png";
    /*map["Cp_Sj"] = "产品与数据";*/
    map["rj_xt"] = "../images/about.png";
    map["Js_Zc"] = "../images/about.png";
    map["Daicy_Tz"] = "../images/about.png";
    /*map["Lx_We"] = "联系我们-TEL";
    map["js_Zt_Js"] = "主题介绍";
    map["js_Gs_Js"] = "公司介绍";
    map["hb_Zt_Js"] = "主题介绍";
    map["rj_Hz_Hb"] = "软件合作伙伴";
    map["yj_Hz_Hb"] = "硬件合作伙伴";
    map["pt_Hz_Hb"] = "平台合作伙伴";*/
    map["xw_dt"] = "images/newDetails.png";
    var type=map[content_type];
    return type;
}
function getModule(content_module){
    var map = {};
    map["nr"] = "内容";
    map["hy"] = "行业";
    map["cs"] = "产品与数据";
    map["rx"] = "软件与系统";
    map["zx"] = "工程咨询";
    map["js"] = "技术支持";
    map["gm"] = "如何购买";
    map["hb"] = "合作伙伴";
    map["xw"] = "新闻";
    map["dh"] = "底部导航";
    var module=map[content_module];
    return module;
}

function getId(content_type){
    var map = {};
    map["Zt_Js"] = "index.html";
    map["Gs_Js"] = "index.html";
    map["Qc_Zz"] = "industry.html#car";
    map["Hk_Ht"] = "industry.html#sky";
    /*map["Dl_Aq"] = "道路安全";*/
    map["Bq_Cp"] = "industry.html#ship";
    map["Zn_Zz"] = "industry.html#make";
    map["Hgy"] = "industry.html#core";
    /*map["Sy_Hg"] = "石油化工";*/
    map["Ky_Jg"] = "industry.html#keYan";
    map["Xi_Pi"] = "industry.html#xinpian";
    map["Rj"] = "software.html#software";
    map["xT"] = "software.html#system";
    map["Pt"] = "software.html#platform";
    map["Qc_Gc_Zx"] = "product.html#car_con";
    map["Dl_Aq_Zx"] = "product.html#road_con";
    map["Fz_Ql_Zx"] = "product.html#fz_con";
    map["CAE_Zx"] = "product.html#cae_con";
    map["Xn_Xt_Zx"] = "product.html#xn_con";
    map["bim"] = "product.html#BIM_con";
    /*map["NrL"] = "内容栏";
    map["Wz_Mk"] = "文字模块";
    map["Srk"] = "输入框";
    map["Wby"] = "文本域";
    map["Gxk"] = "勾选框";
    map["Xx_message"] = "详细说明";
    map["Zt_Js2"] = "主题介绍二";
    map["Tw_Xc"] = "图文宣传";*/
    map["Gy_Daicy"] = "index.html";
    map["Cp_Sj"] = "software.html#software";
    map["rj_xt"] = "software.html#software";
    map["Js_Zc"] = "technical.html";
    map["Daicy_Tz"] = "index.html";
    map["Lx_We"] = "index.html";
    map["js_Zt_Js"] = "index.html";
    map["js_Gs_Js"] = "index.html";
    map["hb_Zt_Js"] = "index.html";
    map["rj_Hz_Hb"] = "partner.html";
    map["yj_Hz_Hb"] = "partner.html";
    map["pt_Hz_Hb"] = "partner.html";
    map["xw_dt"] = "newDetails.html";
    var module=map[content_type];
    return module;
}