import React from 'react';
import { BiCheck, BiX } from 'react-icons/bi';

const Welcome = ({ userData, settings }) => (
  <>
    <div className="welcome-status">
      <h4 className="box-title">
        Welcome
        {' '}
        {userData?.name}
        !
      </h4>
      <p>
        To
        {' '}
        {settings?.site?.param1}
        . You can deposit money to your wallet and start exchanging.
      </p>
      <ul>
        <li>
          <a href="/#">
            <BiCheck className="check" />
            KYC Verified
          </a>
        </li>
        <li>
          <a href="/#">
            <BiX className="cross" />
            Connect Withdrawal Method
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
