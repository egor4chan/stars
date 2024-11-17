import requests
from flask import Flask, jsonify, request, render_template
from telegram import Bot


app = Flask(__name__)

TELEGRAM_TOKEN = "8004244245:AAFgYc4wuS8sZopKZ3QoPTg6rDmXHVCcbv0"
API_URL = f'https://api.telegram.org/bot{TELEGRAM_TOKEN}/'

bot = Bot(token=TELEGRAM_TOKEN)

paid_users = {}

@app.route('/', methods=['GET'])
def start():
    return render_template('index.html')

def generate_invoice():
    title = "Boost"
    description = "Instant ranking up"
    payload = "{}"
    currency = "XTR"  # Telegram Stars
    prices = [{'label': 'Boost', 'amount': 1}]

    params = {
        'title': title,
        'description': description,
        'payload': payload,
        'currency': currency,
        'prices': prices
    }

    response = requests.post(API_URL + 'createInvoiceLink', json=params)

    if response.status_code == 200:
        res = response.json()
        return response.json()
    else:
        return {'error': 'Failed to create invoice'}

@app.route('/generate-invoice', methods=['POST'])
def generate_invoice_route():
    invoice_data = generate_invoice()
    link = invoice_data['result']
    return link

@app.route('/payment-success', methods=['POST'])
def payment_success():
    data = request.json
    user_id = data.get('user_id')
    payment_info = data.get('payment_info')

    if user_id and payment_info:
        paid_users[user_id] = payment_info

        return 'success'
    else:
        return 'error'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')