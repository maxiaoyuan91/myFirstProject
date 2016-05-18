/**
 * Created by Administrator on 2016/5/17.
 */

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