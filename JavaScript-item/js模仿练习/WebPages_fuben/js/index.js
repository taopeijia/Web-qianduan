$(function(){


    //轮播
    $('#myCarousel').carousel({
        interval: 3000 ,//控制轮播的速度
    });
    //系统与软件Tab
    $(".tab-menu li").on('click',function(){
        $(this).addClass('curr').siblings().removeClass('curr');
        $('.tab-contents .content').eq($(this).index()).show().siblings().hide();
    });

});



