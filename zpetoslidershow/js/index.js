var arr = [
    {url: 'images/0.png'},
    {url: 'images/1.png'},
    {url: 'images/2.png'},
    {url: 'images/3.png'},
    {url: 'images/4.png'},
    {url: 'images/5.png'},
    {url: 'images/6.png'},
    {url: 'images/7.png'},
    {url: 'images/8.png'},
    {url: 'images/9.png'},
    {url: 'images/10.png'},
    {url: 'images/11.png'},
    {url: 'images/12.png'},
    {url: 'images/13.png'}
];
var width = $('.wrapper').width() / 4;
var index = 0;
var preIndex = 0;
var key = true;
function init(){
    renderPage();
    bindEvent();
}
function renderPage(){
    var str = '';
    $(arr).each(function(index){
            str +=
            `
            <li class="pics">
                <img src="${$(this)[0].url}" alt="pics" class="small-pics">
            </li>
            `;
    })
    $('.wrapper').append(str);
    $('.wrapper .pics').css('height',width);
    $('.small-pics').each(function(){
        this.onload = function(){
            if($(this).width() >= $(this).height()){
                $(this).css('height','100%');
            }else{
                $(this).css('width','100%');
            }
        }
    })

}
function bindEvent(){
    $('.pics').tap(function(){
        index = $(this).index();
        $('.show').show();
        showBig();
    });
    $('.show').on('swipeLeft',function(){
        changeImg('prev')
    });
    $('.show').on('swipeRight',function(){
        changeImg('next')
    });
    $('.show').on(' doubleTap',function(){
        $(this).hide();
    })
}
function showBig(){
    var img = new Image();
    img.src = arr[index].url;
    img.onload = function(){
        $('.show').html(img);
        if($('.show img').width() >= $('.show img').height()){
            $('.show img').css({
                'width': '100%',
                'height': 'auto'
            })
        }else{
            $('.show img').css({
                'height': '100%',
                'width': 'auto'
            })
        }
        $('.show img').animate({opacity:1},function(){
            key = true;
        });
    }
}
function changeImg(direction){
    if(key){
        // key = false;
        preIndex = index;
        if(direction == 'prev'){
            index = index == arr.length - 1 ? 0 : index + 1
        }else if(direction == 'next'){
            index = index == 0 ? arr.length - 1 : index - 1
        }
    }
    showBig();
}
init()