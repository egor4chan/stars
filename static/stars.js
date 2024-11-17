window.Telegram.WebApp.expand()

function check_payment() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/payment-success');
    var data = JSON.stringify({'operation': 'pay'});
    httpRequest.send(data);

    httpRequest.onprogress = function(event) { // запускается периодически
        var data = httpRequest.response // получаем return из функции flask
        alert(data)
      };

    
}

function checkPaymentSuccess(paymentdata) {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/payment-success');
    var data = paymentdata;
    httpRequest.send(data);
}

function pay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', '/generate-invoice');
    var data = JSON.stringify({'operation': 'pay'});
    httpRequest.send(data);

    httpRequest.onprogress = function(event) { // запускается периодически
        var link = httpRequest.response // получаем return из функции flask
        //window.location.href = link
        //check_payment()

        window.Telegram.WebApp.openInvoice(link, async (status) => {
          if (status == 'paid') {
            alert('Successful payment!')
            await this.checkPaymentSuccess({
              user_id: window.Telegram.WebApp.initDataUnsafe.user.id,
              payment_info: { link }
            })
          }
          else {
            alert('Cancelled payment.')
          }
        })
      };
}