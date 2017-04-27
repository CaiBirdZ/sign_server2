/**
 * Created by 11952 on 2017/3/22.
 */
var map, geolocation;
//加载地图，调用浏览器定位服务
map = new AMap.Map('allmap', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'LT'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
var contextMenu = new AMap.ContextMenu();
//单击左键设置坐标
contextMenu.addItem("设置为公司坐标", function(e) {
    var cpName = $('option:selected', '#posOption').val();
    $.post('http://118.89.233.175:80/setPosition/set',{cpName:cpName,cpPosLon: contextMenuPositon.getLng(),cpPosLat:contextMenuPositon.getLat()},function(data){
        if(data.code=='1'){
            alert("修改成功");
        }else{
            alert("修改失败");
        }
    });

}, 2);

map.on('click', function(e) {
    contextMenu.open(map, e.lnglat);
    contextMenuPositon = e.lnglat;
});
function onComplete(data) {
}
//解析定位错误信息
function onError(data) {
}

