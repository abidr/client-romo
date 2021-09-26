import React from 'react';
import bitcoin from '../images/bitcoin.png';

const AvailableBalance = () => (
  <>
    <a href="/#" className="single-available-balance">
      <img src={bitcoin} alt="" />
      <h4>BTC</h4>
      <p>0.824589</p>
    </a>
  </>
);

export default AvailableBalance;
