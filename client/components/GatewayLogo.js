import React from 'react';
import Coinbase from '../images/gateway/coinbase.svg';
import Coinpayments from '../images/gateway/coinpayments.png';
import Mollie from '../images/gateway/mollie.svg';
import Paypal from '../images/gateway/paypal.svg';
import Stripe from '../images/gateway/stripe.svg';

const GatewayLogo = ({ name }) => {
  if (name === 'stripe') {
    return <img src={Stripe.src} alt={name} />;
  } if (name === 'coinbase') {
    return <img src={Coinbase.src} alt={name} />;
  } if (name === 'mollie') {
    return <img src={Mollie.src} alt={name} />;
  } if (name === 'coinpayments') {
    return <img src={Coinpayments.src} alt={name} />;
  } if (name === 'paypal') {
    return <img src={Paypal.src} alt={name} />;
  }
  return <img src="" alt="" />;
};

export default GatewayLogo;
