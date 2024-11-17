function pay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/generate-invoice');
    var data = JSON.stringify({'operation': 'pay'});
    httpRequest.send(data);
    httpRequest.onload = function() {
        console.log('httpreq', httpRequest)
        console.log('responce', httpRequest.response)
    }
    httpRequest.onprogress = function(event) { // запускается периодически
        var link = httpRequest.response
        window.location.href = link
      };
}