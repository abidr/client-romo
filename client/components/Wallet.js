import React from 'react';
import { BiShare, BiWallet } from 'react-icons/bi';

const Wallet = () => (
  <>
    <div className="wallet-box">
      <h4 className="box-title">My Wallet</h4>
      <p>Available Balance</p>
      <div className="currency-amount">
        <label htmlFor="">12456</label>
        <select name="" id="" className="currency-select">
          <option value="">USD</option>
          <option value="">BTC</option>
          <option value="">ETH</option>
          <option value="">FIL</option>
          <option value="">BNB</option>
          <option value="">DOGE</option>
        </select>
      </div>
      <div className="bttns">
        <a href="/addmoney" className="bttn-small btn-blue">
          <BiWallet />
          Add Money
        </a>
        <a href="/withdraw" className="bttn-small btn-ylo">
          <BiShare />
          Withdraw
        </a>
      </div>
    </div>
  </>
);

export default Wallet;
