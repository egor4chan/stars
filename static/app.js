document.getElementById('pay').addEventListener('click', async () => {
  try {
    const response = await fetch('https://egor4chan-stars-12d2.twc1.net/generate-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (!response.ok) {
      alert('Error 10')
      throw new Error('Error generating invoice.');
    }

    const { invoiceLink } = await response.json();
    console.log('Invoice Link:', invoiceLink);

    if (window.Telegram.WebApp) {
      console.log('Telegram Web App is available.');

      window.Telegram.WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          alert('Payment successful!');
          await reportPaymentSuccess({
            user_id: window.Telegram.WebApp.initDataUnsafe.user.id || 'unknown',
            payment_info: { invoiceLink },
          });
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
    alert('error: ', error);
  }
});

async function reportPaymentSuccess(paymentData) {
  try {
    const response = await fetch('https://egor4chan-stars-12d2.twc1.net/payment-success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    if (response.ok) {
      alert('Payment recorded on server successfully!');
    } else {
      alert('Error reporting payment to server.');
    }
  } catch (error) {
    console.error('Error reporting payment:', error);
    alert('Error reporting payment. Check console for details.');
  }
}
