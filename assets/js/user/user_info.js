$(function() {
    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    // 获取数据
    const userInit = (res) =>{
        $.ajax({
            type: "GET",
            url:"/my/userinfo",
            success: res =>{
                if(res.status !== 0) return layer.msg('获取用户数据失败！')
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }
    userInit()

    // 重置功能
    $('.layui-btn-primary').click((e) => {
        e.preventDefault()
        userInit()
    })
    // 提交数据 重新渲染页面欢迎字样
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:(res) =>{
                if(res.status !== 0) return 
                window.parent.geitUser()
            }
        })
    })
})