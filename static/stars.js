function pay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/generate-invoice');
    var data = JSON.stringify({'operation': 'pay'});
    httpRequest.send(data);
    httpRequest.onload = function() {
        window.location.href = httpRequest.responce
    }
}