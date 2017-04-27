/**
 * Created by 11952 on 2017/4/6.
 */
'use strict';
function submit(){
    //var err
    var userNo=$('#usernum').val();
    var oldPassword=$('#oldPassword').val();
    var newPassword=$('#newPassword').val();
    var confirmPassword=$('#confirmPassword').val();
    var cpKey=$('#cpKey').val();
    if(userNo===''){
        alert('请输入用户名！');
        return false;
    }
    if(oldPassword===''){
        alert('请输入旧密码！');
        return false;
    }
    if(newPassword===''){
        alert('请输入新密码！');
        return false;
    }
    if(confirmPassword===''){
        alert('请再次输入新密码！');
        return false;
    }
    if(cpKey===''){
        alert('请输入公司密钥！');
        return false;
    }
    if(newPassword!==confirmPassword){
        alert('两次密码输入不一致！');
        return false;
    }
    $.post('http://118.89.233.175:80/register/userRepeat',{userNum:userNo},function(data){
        if(data.code==='0'){
            alert('用户名不存在！');
            //err = true;
            return false;
        }
    });
    $.post("http://118.89.233.175:80/login",{userNo:userNo,password:oldPassword}).then(function (result){
        if(result.code !== "1"){
            alert('密码错误！');
            //err = true;
            return false;
        }
    });
    $.post('http://118.89.233.175:80/changePassword/cpKeyExit',{userNum:userNo,cpKey:cpKey}).then(function(data){
        if(data.code!='1'){
            alert('用户密钥错误');
            return false;
        }
    });
    //if(!err){
    //    return false;
    //}
    $.post('http://118.89.233.175:80/changePassword/sure',{userNum:userNo,password:newPassword},function(data){
        if(data.code=='1'){
            alert('修改成功');
            location.href = "http://118.89.233.175:80/optionIndex";
            return true;
        }else{
            alert('修改失败请重试');
            return false;
        }
    });

}