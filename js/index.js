/**
 * Created by Administrator on 2016/5/17.
 */
/*topnav*/
~function(){
    var topNavLis=utils.getElementsByClass("topNavLi");
    for(var i=0; i<topNavLis.length; i++){
        var curLi=topNavLis[i];
        var curLiA=utils.firstChild(curLi);

        curLi.onmouseover=function(){
            var curLiDiv=utils.lastChild(this);
            curLiDiv.style.display="block";
        };
        curLi.onmouseout=function(){

            var curLiDiv=utils.lastChild(this);

            curLiDiv.style.display="none";
        }

    }
}();
/*menu*/
(function(){
    var menuWrap=document.getElementById("menuWrap");
    var menuLi=utils.children(menuWrap,"li");

    for(var i=0; i<menuLi.length; i++){

        var curNav=menuLi[i];

        curNav.onmouseover=function() {
            var curMenu = utils.lastChild(this);
            curMenu.style.display = "block";
        };

        curNav.onmouseout=function(){
         var curMenu = utils.lastChild(this);
         curMenu.style.display="none";
         };
    }
})();

/*tab*/
(function(){
    var allTabBox = utils.getElementsByClass("tabBox");
    for (var i = 0; i < allTabBox.length; i++) {
        tabChange(allTabBox[i]);
    }


    //->��ѡ��л��Ĳ�����װ�ɲ��
    function tabChange(tabBox) {

        var tabBoxUL = utils.children(tabBox,"ul")[0];//->��һ��UL


        var oLis = utils.children(tabBoxUL, "li");//->��һ��UL������Ԫ��LI
       /* var divList = utils.children(tabBox, "div")[0];*/
        var divList=utils.children(utils.children(tabBox, "div")[1],"div");//->������Ԫ���е�DIV

        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onmouseover = function () {
                //->�õ�ǰ��������LI��ѡ�е���ʽ,�����ֵ�Ԫ�ض��Ƴ�ѡ����ʽ
                utils.addClass(this, "bg");
                var curLiSibling = utils.siblings(this);
                for (var k = 0; k < curLiSibling.length; k++) {
                    utils.removeClass(curLiSibling[k], "bg");
                }
                //->�ú͵�ǰ���LI������Ӧ���Ǹ�DIV��ѡ�е���ʽ,�����DIV�Ƴ�ѡ����ʽ
                for (k = 0; k < divList.length; k++) {
                    k === this.index ? utils.addClass(divList[k], "tabListBg") : utils.removeClass(divList[k], "tabListBg");
                }
            }
        }
    }
})();

/*go top*/
(function(){
    var goLink = document.getElementById("goTop");
    goLink.onclick = function () {

       var duration = 500, interval = 10, target = document.documentElement.scrollTop || document.body.scrollTop;
        var step = (target / duration) * interval;
        var timer = window.setInterval(function () {

            var curTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (curTop === 0) {
                window.clearInterval(timer);
                return;
            }
            curTop -= step;

            document.documentElement.scrollTop = curTop;
            document.body.scrollTop = curTop;
        }, interval);
    }
})();
