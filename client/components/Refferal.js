import React from 'react';
import { BiLink } from 'react-icons/bi';

const Refferal = () => (
  <>
    <div className="refferal-box">
      <h4 className="box-title">Refferal Link</h4>
      <p>Share this refferal link to your friends and earn money</p>
      <div className="refferal-form">
        <input type="text" value="https://wallet.tdevs.co/signup?refer=24" className="input-text input-box" />
        <button className="input-box btn-blue"><BiLink /></button>
      </div>
      <p className="mb-0 mt-10">0 user joined from your refferal</p>
    </div>
  </>
);

export default Refferal;
