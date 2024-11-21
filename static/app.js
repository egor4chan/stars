document.getElementById('pay').addEventListener('click', () => {
  try {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://egor4chan-stars-12d2.twc1.net/generate-invoice', true);

    httpRequest.onprogress = async function () {
      if (httpRequest.status >= 200 && httpRequest.status < 300) {
        const invoiceLink = httpRequest.response;

        if (window.Telegram && window.Telegram.WebApp) {
          
          await window.Telegram.WebApp.openInvoice(invoiceLink, (status) => {
            if (status === 'paid') {
              alert('Payment successful!');
            } else if (status === 'cancelled') {
              alert(`Payment cancelled: ${status}`);
            } else {
              alert('Payment failed or not completed.');
            }
          });
        } else {
          alert('This functionality is only available inside Telegram Web App.');
        }
      } else {
        throw new Error(`Request failed with status ${httpRequest.status}`);
      }
    };

    httpRequest.onerror = function () {
      console.error('Error during the request.');
      alert('Error generating invoice. Check console for details.');
    };

    httpRequest.send();
  } catch (error) {
    console.error('Error generating invoice:', error);
    alert('Error generating invoice. Check console for details.');
  }
});