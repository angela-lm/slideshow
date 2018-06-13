
//  兼容 获取元素样式计算属性
function getStyle(obj,attr){
    if(obj.getComputedStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,false)[attr];
    }
}


function startMove(obj,finalObj,callBack){
    clearInterval(obj.timer);
    var iSpeed,iCur;
    obj.timer = setInterval(function(){
        var key = true;
        for(var prop in finalObj){
            if(prop === 'opacity'){
                iCur = parseFloat(getStyle(obj,'opacity')) * 100;
            }else{
                iCur = parseInt(getStyle(obj,prop));
            }
            iSpeed = (finalObj[prop] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(prop === 'opacity'){
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else{
                obj.style[prop] = iCur + iSpeed + 'px';
            }
            if(iCur != finalObj[prop]){
                key = false;
            }
        }
        if(key){
            clearInterval(obj.timer);
            callBack = typeof callBack == 'function' ? callBack() :'';
        }
    },30)
}
function autoMove(moveWay){
    clearTimeout(timer);
    if(key){
        key = false;
        if(!moveWay || moveWay == 'left-right'){
            startMove(sliderList,{left:sliderList.offsetLeft - moveWidth},function(){
                if(Math.abs(sliderList.offsetLeft - moveWidth) == Math.abs(sliderList.offsetWidth)){
                    sliderList.style.left = 0 +'px';
                }
                timer = setTimeout(autoMove,1500);
                moveIndex();
                key = true;
            })
        }else if(moveWay == 'right-left'){
            clearTimeout(timer);
            if(sliderList.offsetLeft === 0){
                sliderList.style.left = -(sliderList.offsetWidth -moveWidth) +'px';
            }
            startMove(sliderList,{left:sliderList.offsetLeft + moveWidth},function(){
                timer = setTimeout(autoMove,1500);
                moveIndex();
                key = true;

            });
        }
    }
}
function moveIndex(){
    for(var i = 0;i < sliderIndex.length;i++){
        sliderIndex[i].className = '';
    }
    var num = Math.ceil(Math.abs(sliderList.offsetLeft) / moveWidth);
    console.log(num);
    sliderIndex[num].className = 'active';
}
var sliderList = document.getElementsByClassName('imgList')[0];
var imgListItem = document.getElementsByClassName('imgList-item')[0];
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var moveWidth = imgListItem.offsetWidth;
var sliderIndex = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');
var timer;
var key = true;
timer = setTimeout(autoMove,1500);
leftBtn.onclick = function(){
    autoMove('right-left');
};
rightBtn.onclick = function(){
    autoMove('left-right');
};
for(var i = 0; i < sliderIndex.length; i++){
    (function(i){
        sliderIndex[i].onclick = function(){
            key = false;
            clearTimeout(timer);
            startMove(sliderList,{left:-moveWidth * i},function(){
                key = true;
                timer = setTimeout(autoMove,1500);
                moveIndex();
            });
        }
    }(i));
}
