// 获取用户基本信息
function geitUser(){
    $.ajax({
        type: 'GET',
        url:"/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // }, 
        success: function(res){
            console.log(res);
            if(res.status !== 0) return layer.msg(res.message)
            randUser(res.data)
            layer.msg(res.message)
        }
    })
}
geitUser() 
// 渲染头像 
function randUser(data){
    // console.log(data);
    let uname = data.nickname || data.username
    // console.log(uname);
    $("#welcome").html(`欢迎 ${uname}`);
    // 按需渲染用户头像
    if (data.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", data.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = uname[0].toUpperCase();
        $(".text-avatar").html(firstName);    
    }
}

// 创建退出跳转登录页面
$('#usrBack').on('click', ()=>{
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },function(){
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
})

// 修改发布文章不跳转问题
function change(){
    $('#change').attr("class",'layui-this').next().attr("class",'')
}