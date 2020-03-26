$(function () {
    $.ajaxPrefilter(function (option) {
        if (option.url.indexOf('/my') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token')
            }
            option.complete = function (xhr) {
                // console.log(xhr);
                if (xhr.responseJSON.status !== 0) {
                    layer.msg(xhr.responseJSON.message);
                    location.href = "login.html";
                }
            }
        }
        option.url = 'http://www.liulongbin.top:3007' + option.url;
    });

});