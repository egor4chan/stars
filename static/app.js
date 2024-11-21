document.getElementById('payButton').addEventListener('click', async () => {
  try {
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://egor4chan-stars-12d2.twc1.net/generate-invoice');
    var responseLink;
    await httpRequest.send();
    httpRequest.onprogress = function (event) {
      console.log('Event: ', event["currentTarget"]["response"])
      responseLink = event.response;
    }

    const invoiceLink = responseLink

    if (window.Telegram || window.Telegram.WebApp) {
      console.log('Telegram Web App is available.');

      window.Telegram.WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          alert('Payment successful!');
        } else if (status === 'cancelled') {
          alert('Payment cancelled.');
        } else {
          alert('Payment failed or not completed.');
        }
      });
    } else {
      alert('This functionality is only available inside Telegram Web App.');
    }
  } catch (error) {
    console.error('Error generating invoice:', error);
    alert('Error generating invoice. Check console for details.');
  }
});

