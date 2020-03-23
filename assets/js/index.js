$(function () {
    $('#exit').on('click', function () {
        //询问框

        layer.confirm('是否退出？', {
            btn: ['是', '点错了'] //按钮
        }, function () {
            // layer.msg('的确很重要', { icon: 1 });
            localStorage.removeItem('token');
            location.href = "/login.html";
        }, function () {

        });
    });



});


function getUserInfo() {
    // 1. 发送请求，获取用户信息
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            // 2. 渲染页面
        },

        // headers 让我们自己配置请求头
        headers: {
            // key: value
            Authorization: localStorage.getItem('token')
        }
    });

}