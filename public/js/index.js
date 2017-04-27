/**
 * Created by 11952 on 2017/3/28.
 */

$(document).ready(function(){
    if(window.localStorage.getItem('userInfo')===null||window.localStorage.getItem('userInfo')===''){
        location.href = 'http://118.89.233.175:80';
    }
})

var getData = function(){
    var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    location.href='http://118.89.233.175:80/setCompanyInfo?userNum='+userInfo;
}
var query = function(){
    var selectCpName = $('option:selected', '#option').val();
    $.post('http://118.89.233.175:80/setCompanyInfo/query',{cpName:selectCpName},function(data){
        if(data){
            //location.href='http://localhost:8080/setCompanyInfo';
            //$('.query').removeClass('displayCtrl');
            //$('.queryAll').addClass('displayCtrl');
            $('.queryAll').addClass('displayCtrl');
            $('#query').remove();
            $('#modify').removeClass('displayCtrl');
            $('#table').append("<tr id='query'><td><input id='cpID' type='text' value="+data.result.cpID+"></td><td><input id='cpName' type='text' value="+data.result.cpName+"></td><td><input id='cpHQ' type='text' value="+data.result.cpHQ+"></td></tr>")

        }
    });
}

var queryAll = function(){
    $('#query').remove();
    $('#modify').addClass('displayCtrl');
    $('.queryAll').removeClass('displayCtrl');
}

var modifyCpInfo = function(){
    var cpID = $('#cpID').val();
    var cpName = $('#cpName').val();
    var cpHQ = $('#cpHQ').val();
    var oldCpName = $('option:selected', '#option').val();
    var err = '1';

    if(cpID==''){
        alert("公司ID不能为空");
        return false;
    }else if(cpName==''){
        alert("公司名不能为空");
        return false;
    }else if(cpHQ==''){
        alert("总部名不能为空");
        return false;
    }
    //$.post('http://118.89.233.175:80/setCompanyInfo/cpIDRepeat',{cpID:cpID},function(data){
    //    if(data.code=='1'){
    //        alert("公司ID已被占用");
    //        err = '0';
    //        return false;
    //    }
    //});
    //if(err=='0'){
    //    return false;
    //}
    //$.post('http://118.89.233.175:80/setCompanyInfo/cpNameRepeat',{cpName:cpName},function(data){
    //    if(data.code=='1'){
    //        alert("公司名已被占用");
    //        err = '0';
    //        return false;
    //    }
    //});
    //if(err=='0'){
    //    return false;
    //}
    //$.post('http://118.89.233.175:80/setCompanyInfo/cpHQExist',{cpHQ:cpHQ},function(data){
    //    if(data.code=='1'){
    //        alert("此总部名不存在");
    //        err = '0';
    //        return false;
    //    }
    //});
    //if(err=='0'){
    //    return false;
    //}

    $.post('http://118.89.233.175:80/setCompanyInfo/modifyCpInfo',{cpID:cpID,cpName:cpName,cpHQ:cpHQ,oldCpName:oldCpName},function(data){
        if(data.code=='1'){
            alert("修改成功");
        }else{
            alert("修改失败");
        }
    });

}

function  setPosHref(){
    var userNum = JSON.parse(window.localStorage.getItem("userInfo"));
    location.href="http://118.89.233.175:80/setPosition?userNum="+userNum;
}

$(function(){
    $('#modifyTable input').click(function(){
        var td=this.parentNode,tr=td.parentNode;
        var jobNo = $('#modifyTable').find('tr').eq(tr.rowIndex).find('td').eq(0).text();
        var signDate = $('#modifyTable').find('tr').eq(tr.rowIndex).find('td').eq(3).text();
        var signTime = $('#modifyTable').find('tr').eq(tr.rowIndex).find('td').eq(4).text();
        var signOut = $('#modifyTable').find('tr').eq(tr.rowIndex).find('td').eq(5).text();
        $.post('http://118.89.233.175:80/modifyConfirm/sure',{jobNo:jobNo,signDate:signDate,signTime:signTime,signOut:signOut},function(data){
            if(data.code=='1'){
                alert("成功");
            }else{
                alert("失败");
            }
        });
    });


});