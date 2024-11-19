document.getElementById('pay').addEventListener('click', async () => {
  try {
    const response = await fetch('https://1444-185-70-187-194.ngrok-free.app/generate-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error generating invoice.');
    }

    const { invoiceLink } = await response.json();
    console.log('Invoice Link:', invoiceLink);

    if (window.Telegram?.WebApp) {
      console.log('Telegram Web App is available.');

      window.Telegram.WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          alert('Payment successful!');
          await reportPaymentSuccess({
            user_id: window.Telegram.WebApp.initDataUnsafe?.user?.id || 'unknown',
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
    alert('Error generating invoice. Check console for details.');
  }
});

async function reportPaymentSuccess(paymentData) {
  try {
    const response = await fetch('https://1444-185-70-187-194.ngrok-free.app/payment-success', {
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
