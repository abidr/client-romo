import React from 'react';
import { BiCheck, BiX } from 'react-icons/bi';
import { useDepositAll } from '../data/useDeposits';
import Loader from './Loader';

const Welcome = ({ userData, settings }) => {
  const { data, loading } = useDepositAll(1, 10);

  if (loading) {
    return <Loader height="225px" />;
  }

  return (
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
              {userData?.kyc ? (
                <BiCheck className="check" />
              ) : (
                <BiX className="cross" />
              )}
              KYC Verified
            </a>
          </li>
          <li>
            <a href="/#">
              {data?.count ? (
                <BiCheck className="check" />
              ) : (
                <BiX className="cross" />
              )}
              Deposit Money
            </a>
          </li>
          <li>
            <a href="/#">
              {data?.count ? (
                <BiCheck className="check" />
              ) : (
                <BiX className="cross" />
              )}
              Connect Withdrawal Method
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Welcome;
