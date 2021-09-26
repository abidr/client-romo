import React from 'react';
import { BiCheck, BiX } from 'react-icons/bi';

const Welcome = () => (
  <>
    <div className="welcome-status">
      <h4 className="box-title">Welcome to Wallet!</h4>
      <p>To Tradeyum. You can deposit money to your wallet and start exchanging.</p>
      <ul>
        <li>
          <a href="/#">
            <BiCheck className="check" />
            Account Verified
          </a>
        </li>
        <li>
          <a href="/#">
            <BiX className="cross" />
            Connect Withdrawl Methods
          </a>
        </li>
        <li>
          <a href="/#">
            <BiCheck className="check" />
            Deposit Money
          </a>
        </li>
      </ul>
    </div>
  </>
);

export default Welcome;
