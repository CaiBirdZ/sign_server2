/**
 * Created by 11952 on 2017/4/8.
 */
function byJobNo(){
    var jobNo = $('#jobNo').val();
    if(jobNo===''){
        alert('请输入员工号');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byJobNo',{jobNo:jobNo},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#recordTable').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byDepartment(){
    var department = $('#department').val();
    if(department===''){
        alert('请输入部门');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byDepartment',{department:department},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#recordTable').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}
function bySignDate(){
    var signDate = $('#signDate').val();
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/bySignDate',{signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#recordTable').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byJobNoAndSignDate(){
    var signDate = $('#signDate').val();
    var jobNo = $('#jobNo').val();
    if(jobNo===''){
        alert('请输入员工号');
        return false;
    }
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byJobNoAndSignDate',{jobNo:jobNo,signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#recordTable').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

function byDepartmentAndSignDate(){
    var signDate = $('#signDate').val();
    var department = $('#department').val();
    if(department===''){
        alert('请输入员工号');
        return false;
    }
    if(signDate===''){
        alert('请输入日期');
        return false;
    }
    $.post('http://118.89.233.175:80/queryRecord/byDepartmentAndSignDate',{department:department,signDate:signDate},function(data){
        if(data.code=='1'){
            var array=data.result;
            for(var i in array){
                $('#recordTable').append("<tr><td>"+array[i].jobNo+"</td><td>"+array[i].emName+"</td><td>"+array[i].department+"</td><td>"+ array[i].signDate+"</td><td>"+ array[i].signTime+"</td><td>"+ array[i].signOut+"</td></tr>");
            }
        }else{
            alert('查询失败，请重试');
        }
    });
}

