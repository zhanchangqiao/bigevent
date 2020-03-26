var form = layui.form;
$(function () {
    console.log('a')
    $('.layui-form').on('submit', function (e) {
        // console.log(15);
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.post('/my/userinfo', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            window.parent.getUserInfo();
        })
    });
    $('[type=reset]').on('click', function (e) {
        e.preventDefault();
        init();
    })
    init();
});
function init() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        success: function (res) {
            console.log(res);
            form.val('f1', res.data);
        }
    });
}