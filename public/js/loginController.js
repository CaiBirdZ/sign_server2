/**
 * Created by 11952 on 2017/3/13.
 */
var signIn = function(){
    var userNo = $("#userNo").val();
    var password = $('#password').val();
    var userNoTest=/^[A-Za-z0-9]{4,16}$/;
    var passwordTest=/^[A-Z]|[a-z]|[0-9]|[_,.]{6,20}$/;

    if(userNo==''){
        alert("请输入账号！")
        return false;
    }else if(!userNoTest.test(userNo)){
        alert("账号不合法！")
        return false;
    }
    if(password==''){
        alert("请输入密码！")
        return false;
    }else if(!passwordTest.test(password)){
        alert("密码不合法！")
        return false;
    }

    $.post("http://118.89.233.175:80/login",{userNo:userNo,password:password},onSuccess);
    function onSuccess(result){
        if(result.code == "1"){
            window.localStorage.setItem('userInfo',JSON.stringify(result.result));
            location.href = "http://118.89.233.175:80/optionIndex";
        }else if(result.code =="0"){
            alert("账号/密码错误！");
        }
    }
}