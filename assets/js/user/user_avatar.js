$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#choose').on('click', function () {
        $('#file').click();
    });
    $('#file').on('change', function () {
        var file = this.files[0];
        var newImgURL = URL.createObjectURL(file);
        console.log(newImgURL);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options);

    });
    $('#strat').on('click', function () {
        var can = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            });
        console.log(can);
        var x = can.toDataURL();
        console.log(x);   // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: { avatar: x },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.status);
                }
                console.log(res);
                window.parent.getUserInfo();
            }

        })

    });
});