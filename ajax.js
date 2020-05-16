//参数: 请求的地址,成功的回调函数,失败的回调函数
function ajax(url, fnSucc, fnFaild) {
    if (window.XMLHttpRequest) {
        //创建ajax对象
        var oAjax = new XMLHttpRequest();
    }
    else {
        var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 书写请求报文
    oAjax.open('GET', url, true)
    oAjax.send();
    oAjax.onreadystatechange = function () {
        //如果服务器响应完成
        if (oAjax.readyState == 4) {
            //如果http状态码为200
            if (oAjax.status == 200) {
                fnSucc(oAjax.response)
            }
        }
    }



}