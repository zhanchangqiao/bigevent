$(function () {
    var form = layui.form;
    var laypage = layui.laypage;
    var d = {
        pagenum: 1, // 页码值，默认显示第1页
        pagesize: 2, // 每页显示多少条数据
        cate_id: '', // 分类id
        state: '' // 文章状态，可选的值：已发布  草稿
    };

    template.defaults.imports.formatDate = function (t) {
        // console.log(t);
        var d = new Date(t); // 根据传入的t，创建一个时间日期对象
        var year = d.getFullYear();
        var month = addZero(d.getMonth() + 1);
        var day = addZero(d.getDate());
        var hour = addZero(d.getHours());
        var minute = addZero(d.getMinutes());
        var second = addZero(d.getSeconds());
        return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    function addZero(a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return a;
        }
    }
    initTbody();
    showsel();
    function initTbody() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: d,
            success: function (res) {
                console.log(res);
                // 通过模板引擎渲染结果到页面
                var strHtml = template('tb', res);
                // console.log(strHtml);
                $('tbody').html(strHtml);
                // 数据列表渲染成功，然后调用分页函数
                showpage(res.total);
            }
        });
    }
    function showpage(a) {
        laypage.render({
            elem: 'test1',
            count: a, //数据总数，从服务端得到
            curr: d.pagenum, // 默认显示第几页
            limit: 2,
            layout: ['prev', 'page', 'next', 'limit', 'skip'],
            limits: [2, 3, 5, 10],
            groups: 4,
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    d.pagenum = obj.curr;
                    d.pagesize = obj.limit;
                    initTbody();
                }
            }
        })
    }
    $('body').on('click', '#del', function () {
        var that = $(this);
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            var id = that.attr('data-id');
            // console.log(id);
            $.get('/my/article/delete/' + id, function (res) {
                // console.log(res);
                initTbody();
            })
            layer.close(index);
        });

    })



    function showsel() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var s1 = template('s1', res);
                $('#cateid').html(s1);
                form.render('select');
            }
        })

    }

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        var a = $(this).serializeArray();
        // console.log(a);
        d.cate_id = a[0].value;
        d.state = a[1].value;
        initTbody();
    })
    $('body').on('click', '.edit', function () {
        // 获取事件源上的data-id属性
        var id = $(this).attr('data-id');
        location.href = '/article/art-edit.html?id=' + id;
    });

});
