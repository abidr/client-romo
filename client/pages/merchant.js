/* eslint-disable max-len */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import RequestPayment from '../components/merchant/RequestPayment';
import StoreSettings from '../components/merchant/StoreSettings';
import TransactionHistory from '../components/merchant/TransactionHistory';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Merchant = ({ userData, settings }) => {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <>
      <Head>
        <title>
          Merchant -
          {' '}
          {settings?.site?.param1}
        </title>
      </Head>
      <UserHeader />
      <Sidebar userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <UserTab
                title="Merchant"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit?"
                defaultTab={parseInt(tab, 10)}
              >
                <TabModule icon={<BiWallet />} name="Request Payment">
                  <RequestPayment />
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Recent Transactions">
                  <div className="basic-card">
                    <h4 className="box-title">Recent Transactions</h4>
                    <TransactionHistory />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Store Settings">
                  <StoreSettings userData={userData} />
                </TabModule>
              </UserTab>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Merchant);
