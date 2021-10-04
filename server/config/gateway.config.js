const fieldData = {
  mollie: {
    api_key: true,
    secret_key: false,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'SGD'],
  },
  coinbase: {
    api_key: true,
    secret_key: false,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
    supportedCurrencies: ['USD'],
  },
  coinpayments: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
    supportedCurrencies: ['BTC', 'ETH'],
  },
  paypal: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: true, label: 'Environment' },
    ex2: { status: false, label: 'N/A' },
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'SGD'],
  },
  stripe: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: true, label: 'Signing Secret' },
    ex2: { status: false, label: 'N/A' },
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'SGD'],
  },
};

module.exports = fieldData;
