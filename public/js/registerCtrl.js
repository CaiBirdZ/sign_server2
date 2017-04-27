/**
 * Created by 11952 on 2017/3/27.
 */

var errCode = false;

var userRepeat=function(){
    var userNum = $('#userNum').val();
    var userNoTest=/^[A-Za-z0-9]{4,16}$/;


    if(userNum==''){
        alert('用户名不能为空');
        errCode=true;
        return false;
    }else if(!userNoTest.test(userNum)){
        alert('用户名不合法');
        errCode=true;
        return false;
    }else{
        errCode=false;
    }
    $.post('http://118.89.233.175:80/register/userRepeat',{userNum:userNum},function(data){
        if(data.code=='1'){
            alert('用户名已存在！');
            errCode=true;
            return false;
        }else{
            errCode=false;
        }
    });
}

var cpKeyRepeat=function(){
    var cpKey = $('#cpKey').val();

    if(cpKey==''){
        alert('cpKey不能为空');
        errCode=true;
        return false;
    }else{
        errCode=false;
    }

    $.post('http://118.89.233.175:80/register/cpKeyExist',{cpKey:cpKey},function(data){
        if(data.code=='0'){
            alert('cpKey不存在！');
            errCode=true;
            return false;
        }else{
            errCode=false;
        }
    });
    $.post('http://118.89.233.175:80/register/cpKeyRepeat',{cpKey:cpKey},function(data){
        if(data.code=='1'){
            alert('cpKey已被使用！');
            errCode=true;
            return false;
        }else{
            errCode=false;
        }
    });
}

var pwIsLegal=function(){
    var registerPw=$('#registerPw').val();
    var confirmPw=$('#confirmPw').val();
    var passwordTest=/^[A-Z]|[a-z]|[0-9]|[_,.]{6,20}$/;

    if(registerPw==''){
        alert('密码不能为空');
        errCode=true;
        return false;
    }else if(!passwordTest.test(registerPw)){
        alert('密码不合法');
        errCode=true;
        return false;
    }else{
        errCode=false;
    }
}

var isEqually = function(){
    var registerPw=$('#registerPw').val();
    var confirmPw=$('#confirmPw').val();

    if(registerPw!=confirmPw){
        alert("两次密码输入不一致");
        errCode=true;
        return false;
    }else{
        errCode=false;
    }
}

var register = function(){
    var userNum = $('#userNum').val();
    var cpKey = $('#cpKey').val();
    var registerPw=$('#registerPw').val();
    var confirmPw=$('#confirmPw').val();
    userRepeat();
    pwIsLegal();
    cpKeyRepeat();
    isEqually();
    if(errCode){
        return false;
    }

    $.post('http://118.89.233.175:80/register/sure',{userNum:userNum,cpKey:cpKey,password:registerPw},function(data){
        if(data.code=='1'){
            location.href="http://118.89.233.175:80/optionIndex";
        }else{
            alert("注册失败");
        }
    })

}