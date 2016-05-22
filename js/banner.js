(function () {
    var banner = document.getElementById("recomGoods"), bannerInner = utils.firstChild(banner);

    var imgList = bannerInner.getElementsByTagName("img");
    var bannerLeft = utils.children(banner, "a")[0], bannerRight = utils.children(banner, "a")[1];

    //1、Ajax请求数据
    var jsonData = null, count = null;
    ~function () {
        var xhr = new XMLHttpRequest;
        xhr.open("get", "json/today.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            }
        };
        xhr.send(null);
    }();

    //2、按照字符串拼接的方式绑定数据
    ~function () {
        //1)绑定的是轮播图区域的数据
        var str = '';
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<li><img src="" trueImg="' + curData["img"] + '"/></li>';
            }
            //->为了实现无缝滚动我们需要把第一张图片克隆一份一模一样的放在末尾
            for(var k=0; k<4; k++){

                str += '<li><img src="" trueImg="' + jsonData[k]["img"] + '"/></li>';
            }

        }
        bannerInner.innerHTML = str;
        count = jsonData.length + 4;
        utils.css(bannerInner, "width", count * 250);

    }();

    //3、实现图片的延迟加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null;
                    zhufengAnimate(curImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }

    //4、实现自动轮播
    //->记录的是步长(当前是哪一张图片,零是第一张图片)
    var step = 0;
    function autoMove() {
        if (step >= (count - 4)) {
            console.log(11)
            step = 0;
            bannerInner.style.left = 0;
        }
        step+=4;
        zhufengAnimate(bannerInner, {left: -step * 250}, 500);

    }
    //->6、停止和开启自动轮播
    banner.onmouseover = function () {
       bannerLeft.style.display = bannerRight.style.display = "block";
    };
    banner.onmouseout = function () {
       bannerLeft.style.display = bannerRight.style.display = "none";
    };



    //8、实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
            step = count - 4;
            utils.css(bannerInner, "left", -step * 250);
        }
        step-=4;
        zhufengAnimate(bannerInner, {left: -step * 250}, 500);

    }
})();