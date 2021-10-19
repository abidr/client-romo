/* eslint-disable max-len */
import Head from 'next/head';
import React, { useState } from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import ExchangeHistory from '../components/exchanges/ExchangeHistory';
import ExchangeStep from '../components/exchanges/ExchangeStep';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Exchange = ({ userData, settings }) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <Head>
        <title>
          Exchange -
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
                title="Exchange Money"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit"
              >
                <TabModule icon={<BiWallet />} name="Exchange">
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <ExchangeStep step={step} setStep={setStep} settings={settings} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Exchange Logs">
                  <div className="basic-card">
                    <h4 className="box-title">Exchange Logs</h4>
                    <ExchangeHistory />
                  </div>
                </TabModule>
              </UserTab>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Exchange);
