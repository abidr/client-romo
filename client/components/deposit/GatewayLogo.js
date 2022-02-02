import React from 'react';
import Coinbase from '../../images/gateway/coinbase.svg';
import Coingate from '../../images/gateway/coingate.png';
import Coinpayments from '../../images/gateway/coinpayments.png';
import Mollie from '../../images/gateway/mollie.svg';
import Moov from '../../images/gateway/moov.png';
import Mtn from '../../images/gateway/mtnmoney.png';
import Om from '../../images/gateway/om.png';
import Paydunya from '../../images/gateway/paydunya.png';
import Paypal from '../../images/gateway/paypal.svg';
import Paystack from '../../images/gateway/paystack.png';
import Perfectmoney from '../../images/gateway/perfectmoney.png';
import Stripe from '../../images/gateway/stripe.svg';
import Voguepay from '../../images/gateway/voguepay.svg';

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
  } if (name === 'coingate') {
    return <img src={Coingate.src} alt={name} />;
  } if (name === 'paystack') {
    return <img src={Paystack.src} alt={name} />;
  } if (name === 'voguepay') {
    return <img src={Voguepay.src} alt={name} />;
  } if (name === 'perfectmoney') {
    return <img src={Perfectmoney.src} alt={name} />;
  } if (name === 'paydunya') {
    return <img src={Paydunya.src} alt={name} />;
  } if (name === 'om') {
    return <img src={Om.src} alt={name} />;
  } if (name === 'mtn') {
    return <img src={Mtn.src} alt={name} style={{ filter: 'none', height: '55px' }} />;
  } if (name === 'moov') {
    return <img src={Moov.src} alt={name} style={{ filter: 'none', height: '55px' }} />;
  }
  return <img src="" alt="" />;
};

export default GatewayLogo;
