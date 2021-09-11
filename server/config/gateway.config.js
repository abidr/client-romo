const fieldData = {
  mollie: {
    api_key: true,
    secret_key: false,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
  },
  coinbase: {
    api_key: true,
    secret_key: false,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
  },
  coinpayments: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: false, label: 'N/A' },
    ex2: { status: false, label: 'N/A' },
  },
  paypal: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: true, label: 'Environment' },
    ex2: { status: false, label: 'N/A' },
  },
  stripe: {
    api_key: true,
    secret_key: true,
    email: false,
    ex1: { status: true, label: 'Signing Secret' },
    ex2: { status: false, label: 'N/A' },
  },
};

module.exports = fieldData;
