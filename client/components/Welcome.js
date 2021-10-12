import Link from 'next/link';
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
            <Link href="/settings?tab=kyc">
              <a>
                {userData?.kyc ? (
                  <BiCheck className="check" />
                ) : (
                  <BiX className="cross" />
                )}
                KYC Verified
              </a>
            </Link>
          </li>
          <li>
            <Link href="/add-money">
              <a>
                {data?.count ? (
                  <BiCheck className="check" />
                ) : (
                  <BiX className="cross" />
                )}
                Deposit Money
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings?tab=linked">
              <a>
                {data?.count ? (
                  <BiCheck className="check" />
                ) : (
                  <BiX className="cross" />
                )}
                Connect Withdrawal Method
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Welcome;
