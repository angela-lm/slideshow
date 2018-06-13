var imgData = [
    {title:'6艘全新舰船加入建造',url:'image/1.jpg'},
    {title:'天空在下着鲨',url:'image/2.jpg'},
    {title:'梦塔学迷城邀你入梦',url:'image/3.jpg'},
    {title:'为你pick的小姐姐加油吧',url:'image/4.jpg'}
];
var flag = true,
    index = 0,
    len = imgData.length,
    timer = '',
    moveWidth = $('.wrapper').width();
function init(){
    renderPage(imgData);
    $('.content').width((len + 1) * moveWidth)
    bindEvent();
    sliderAuto();
}
init();
function renderPage(imgData){
    var str = '';
    var listStr = '';
    var btnStr = '';
    var len = imgData.length;
    if(len <= 1){
        str = `
        <li class="show-page">
            <a href="#" class="page-link">
                <img src="${imgData[0].url}" alt="${I=imgData[0].title}">
                <h5>${imgData[0].title}</h5>
            </a>
        </li>
        `
    }else{
        $.each(imgData,function(index){
            str +=
             `            
            <li class="show-page">
                <a href="#" class="page-link">
                    <img src="${$(this)[0].url}" alt="${$(this)[0].title}">
                    <h5>${$(this)[0].title}</h5>
                </a>
            </li>
            `;
            listStr +=
            `
            <li data-index="${index}"></li>
            `;
        });
        str += `            
        <li class="show-page">
            <a href="#" class="page-link">
                <img src="${imgData[0].url}" alt="${imgData[0].title}">
                <h5>${imgData[0].title}</h5>
            </a>
        </li>
        `;
        listStr = 
        `
        <ul class="list">${listStr}</ul>
        `;
        btnStr = 
        `
        <div class="c-btn">
            <div class="left-btn"></div>
            <div class="right-btn"></div>
        </div>
        `;
    }
    $('.content').append(str).append(btnStr).append(listStr);
    $('.content').find('.list li').eq(0).addClass('on');
}
function bindEvent(){
    $('.list li').add($('.left-btn')).add($('.right-btn')).on('click',function(e){
        if($(this).attr('class') == 'left-btn'){
            move('prev');
        }else if($(this).attr('class') == 'right-btn'){
            move('next');
        }else{
            var index = $(this).index();
            move(index);
        }
    })
}
function move(way){
    //  确保 一次运动结束之后开始下次运动
    if(flag){
        flag = false;
        if(way == 'prev'){
            //  向左运动
            if(index == 0){
                index = len - 1;
                $('.content').css('margin-left',-len * moveWidth);
            }else{
                index = index - 1;
            }
            //  向右运动
        }else if(way == 'next'){
            if(index == len - 1){
                $('.content').animate({'margin-left':-len * moveWidth},function(){
                    $(this).css('margin-left',0);
                })
                index = 0;
            }else{
                index = index + 1
            }
        }else{
            index = way;
        }
        changeIndexStyle();
        slider();
    }
}
function slider(){
    $('.content').animate({'margin-left': -moveWidth * index},function(){
        flag = true;
        sliderAuto();
    })
}
function sliderAuto(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        move('next');
    },2000)
}
function changeIndexStyle(){
    $('.on').removeClass('on');
    $('.list li').eq(index).addClass('on');
}