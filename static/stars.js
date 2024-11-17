function pay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/generate-invoice');
    var data = JSON.stringify({'operation': 'pay'});
    httpRequest.send(data);
    httpRequest.onload = function() {
        alert('responce: ', httpRequest.response)
        alert('onload: ', httpRequest.onload)
        alert('status: ', httpRequest.status)
        window.location.href = httpRequest.response
    }
}