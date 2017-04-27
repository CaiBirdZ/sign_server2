/**
 * Created by 11952 on 2017/4/8.
 */
function add(){
    var emailReg=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var telTest=/^1[34578]\d{9}$/;
    var jobNo = $('#jobNo').val();
    var emName= $('#emName').val();
    var department = $('#department').val();
    var emTel= $('#emTel').val();
    var email= $('#email').val();
    if(jobNo == ''|| jobNo == null){
        alert("请输入工号");
        return false;
    }else if(jobNo.length<6||jobNo.length>20){
        alert("请输入正确的工号");
        return false;
    }
    if(emName == ''|| emName == null){
        alert("请输入姓名");
        return false;
    }
    if(department == ''|| department == null){
        alert("请输入部门");
        return false;
    }
    if(emTel == ''|| emTel == null){
        alert("请输入手机号");
        return false;
    }else if(!telTest.test(emTel)){
        alert("请输入正确的手机号");
        return false;
    }

    if(email == ''|| email == null){
        alert("请输入邮箱");
        return false;
    }else if(!emailReg.test(email)){
        alert("请输入正确的邮箱");
        return false;
    }
    $.post('http://118.89.233.175:80/addUsers/add',{jobNo:jobNo,emName:emName,department:department,emTel:emTel,email:email},function(data){
        if(data.code=='1'){
            alert('添加成功');
            return true;
        }else{
            alert('失败请重试');
            return false;
        }
    });

}
