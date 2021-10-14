import Link from 'next/link';
import React from 'react';
import { BiCheck, BiX } from 'react-icons/bi';
import { useDepositAll } from '../data/useDeposits';
import useLinkeds from '../data/useLinkeds';
import Loader from './Loader';

const Welcome = ({ userData, settings }) => {
  const { data, loading } = useDepositAll(1, 10);
  const { data: linkedAcc, loading: linkedLoading } = useLinkeds();

  if (loading || linkedLoading) {
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
            <Link href="/settings?tab=1">
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
          {userData?.role === 2 ? (
            <li>
              <Link href="/add-money">
                <a>
                  {data?.count ? (
                    <BiCheck className="check" />
                  ) : (
                    <BiX className="cross" />
                  )}
                  Store Creation
                </a>
              </Link>
            </li>
          ) : (
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
          )}
          <li>
            <Link href="/settings?tab=2">
              <a>
                {linkedAcc?.count ? (
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
