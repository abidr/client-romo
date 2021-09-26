import React from 'react';
import bitcoin from '../images/bitcoin.png';
import ethereum from '../images/ethereum.png';

const CoinTrade = () => (
  <>
    <div className="single-coin active">
      <div className="coin-title">
        <img src={bitcoin.src} alt="" />
        <h5 className="d-inline-block">BTC</h5>
      </div>
      <h4>
        39011.0000 USD
      </h4>
    </div>
    <div className="single-coin">
      <div className="coin-title">
        <img src={ethereum.src} alt="" />
        <h5 className="d-inline-block">ETH</h5>
      </div>
      <h4>
        39011.0000 USD
      </h4>
    </div>
  </>
);

export default CoinTrade;
