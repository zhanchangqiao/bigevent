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

    getUserInfo();

});


function getUserInfo() {
    // 1. 发送请求，获取用户信息
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            // 2. 渲染页面
            //成功
            var data = res.data;
            var username = data.nickname || data.username;;
            console.log(res.data.user_pic);
            if (res.data.user_pic) {
                $('.touxiang').show();
                $('.layui-nav-img').show().attr('src', res.data.user_pic);
                console.log('1')
            } else {
                $('.layui-nav-img').hide();
                $('.touxiang').css('display', 'inline-block').text(username.substring(0, 1).toUpperCase());
                console.log('2')
            }

        }
    });

}