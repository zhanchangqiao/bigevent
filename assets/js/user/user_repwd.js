$(function () {
    var form = layui.form;
    form.verify({
        len: [/^[\S]{6,12}$/, '密码长度必须6~12位'],
        psd: function (text) {
            var old = $('#old').val();
            if (old === text) {
                return '原密码与新密码一致';
            }
        },
        repsw: function (text) {
            var newpwd = $('#new').val();
            if (text !== newpwd) {
                return '两次输入的密码不一致';
            }
        }


    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('[type=reset]').click();
            }
        });

    });
});