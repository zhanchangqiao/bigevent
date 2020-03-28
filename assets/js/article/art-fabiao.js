$(function () {
    var form = layui.form;
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 选择封面部分
    $('.layui-btn-danger').on('click', function (e) {
        $('#file').click();
    })
    // 获取所有的分类，并渲染
    renderCategory();
    function renderCategory() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var strHtml = template('tpl-category', res);
                $('#category').html(strHtml);
                // 对于动态创建了select框，必须更新渲染
                form.render('select'); // 对页面中的select框从新渲染
            }
        });
    }
    //文件与发生变化
    $('#file').on('change', function (e) {
        console.log($(this))
        var file = $(this)[0].files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options);        // 重新初始化裁剪区域
    })
    var s = '';
    $('#fabu').on('click', function () {
        s = '已发布';
    })
    $('#caogao').on('click', function () {
        s = '草稿';
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        console.log(s);
        data.append('state', s); //
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 到此为止，图片剪裁工作做完了，得到一个二进制的图片，是形参 blob
            // 向fd中追加图片
            data.append('cover_img', blob);
            $.ajax({
                url: '/my/article/add',
                type: 'post',
                data: data,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    // 成功了
                    layer.msg(s + '成功');
                    location.href = '/article/art-wzh.html';
                },
                // progress: false,
                // content- type: false,
                processData: false,
                contentType: false,
            });
        });
    })
    //结尾括号
});