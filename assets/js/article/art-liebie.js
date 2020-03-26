$(function () {
    var form = layui.form;
    initliebie();
    var addIndex = null;
    var editIndex = null;
    $('body').on('click', '.del', function (e) {
        var that = $(this);
        index = layer.confirm('确定删除', { icon: 5, title: '提示' }, function (index) {
            //do something
            var id = that.attr('data-Id');
            console.log(id);
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                }
            });
            layer.close(index);
            initliebie();
        });
    });
    //页面层
    $('.add').on('click', function () {
        addIndex = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'], //宽高
            content: $('#addliebie').html()
        });
    });
    $('body').on('submit', '.form1', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                // 添加成功。
                // 1. 关闭弹层
                layer.close(addIndex);
                // 2. 从新渲染数据
                initliebie();
            }
        });
    });
    $('body').on('click', '.edit', function (e) {
        var data = this.dataset;
        var id = $(this).attr('data-id');
        $.get('/my/article/cates/' + id, function (res) {
            if (res.status !== 0) {
                return layer.msg('获取分类数据失败');
            }
            editIndex = layer.open({
                type: 1,
                title: '修改信息',
                area: ['500px', '250px'], //宽高
                content: $('#editliebie').html(),
                success: function () {
                    form.val('f1', res.data);
                }
            });
        });
    });

    $('body').on('submit', '.form2', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                // 添加成功。
                // 1. 关闭弹层
                layer.close(editIndex);
                // 2. 从新渲染数据
                initliebie();
            }
        });
    });
});
function initliebie() {
    $.ajax({
        url: '/my/article/cates',
        type: 'get',
        data: {},
        success: function (res) {
            console.log(res);
            var li = template('li', res);
            // console.log(li);
            $('tbody').html(li);
        }

    });
}