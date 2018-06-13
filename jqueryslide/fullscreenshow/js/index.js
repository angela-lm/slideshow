var imgData = [
    {title:'这是一个电脑',des: '这是一个会让你很喜欢很满意的电脑哟',url: './images/img-1.png'},
    {title:'这是一个电脑',des: '这是一个会让你很喜欢很满意的电脑哟',url: './images/img-2.png'},
    {title:'这是一个电脑',des: '这是一个会让你很喜欢很满意的电脑哟',url: './images/img-3.png'},
]
var fullScreen = {
    index: 0,
    preIndex: 0,
    len: imgData.length,
    key: true,
    timer: null,
    init: function(){
        this.renderPage();
        this.bindEvent();
        this.autoMove();
    },
    renderPage: function(){
        var str = '',
            btnStr = '',
            sliderList = '';
        if(this.len > 1){
            $(imgData).each(function(index){
                str += 
                `
                <div class="slider">
                    <div class="title">
                        <h2>${$(this)[0].title}</h2>
                        <p>${$(this)[0].des}</p>
                    </div>
                    <div class="image">
                        <img src="${$(this)[0].url}" alt="#">
                    </div>
                </div>
                `
                sliderList += 
                `
                <li>${index}</li>
                `;
            });
            $('.slider-list').html(str);
            btnStr = 
            `
            <div class="slider-btn">
                <span class="left-btn"></span>
                <span class="right-btn"></span>
            </div>
            `;
            sliderList = 
            `
            <ul class="slider-order">
                ${sliderList}
            </ul>
            `;
            $('.wrapper').append(btnStr).append(sliderList);
            $('.slider-order li').eq(0).addClass('active')
        }
    },
    bindEvent: function(){
        var _this = this;
        $('.left-btn').add($('.right-btn')).add($('.slider-order li')).on('click',function(){
            var className = $(this).attr('class');
            if(className == 'left-btn' || className == 'right-btn'){
                if(className == 'left-btn'){
                    _this.move('prev');
                }else{
                    _this.move('next');
                }
            }else{
                _this.move($(this).index());
            }
        })
    },
    move: function(direction){
        if(this.key){
            this.key = false;
            this.preIndex = this.index;
            if(direction == 'prev'){
                if(this.index == 0){
                    this.index = this.len - 1;
                }else{
                    this.index--
                }
            }else if(direction == 'next'){
                if(this.index == this.len - 1){
                    this.index = 0
                }else{
                    this.index++
                }
            }else{
                this.index = direction;
            }
            this.sliderShow();
        }
    },
    sliderShow: function(){
        var _this = this;
        if(this.preIndex != this.index){
            $('.slider').eq(_this.preIndex).fadeOut(function(){
                _this.changeIndexStyle();
                $('.slider').eq(_this.index).fadeIn(function(){
                }).find('.image').animate({width:'40%'},function(){
                    _this.key = true;
                    _this.autoMove();
                });
            }).find('.image').animate({width: '0'});
        }
    },
    changeIndexStyle: function(){
        $('.slider-order .active').removeClass('active');
        $('.slider-order li').eq(this.index).addClass('active');
    },
    autoMove: function(){
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function(){
            _this.move('next');
        },2000)
    }
}
fullScreen.init();