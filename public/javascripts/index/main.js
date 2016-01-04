(function() {
    $(".well").hide();
    
    function init() {
        if ($("#inputUsername").val === undefined) {
            $(".well").val("请输入用户名");
            $(".well").show()
        }
        
        if ($("#inputPassword").val === undefined) {
            $(".well").val("密码不能为空");
            $(".well").show()
        }
    }
    
    login();
    function login() {
       $("#btnLogin").click(function() {
            init();
            
            var loginInfo = {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val()
            }
            
            console.log(loginInfo);
            
            $.ajax({
                type: "post",
                url: "/login",
                data: loginInfo,
                success: function(data) {
                    console.log(data)
                }
            })
        })
    }
})()