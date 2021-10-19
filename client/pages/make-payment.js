import Head from 'next/head';
import React, { useState } from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import PaymentHistory from '../components/payment/PaymentHistory';
import PaymentStep from '../components/payment/PaymentStep';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const MakePayment = ({ userData, settings }) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <Head>
        <title>
          Payment -
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
                title="Make Payment"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime"
              >
                <TabModule icon={<BiWallet />} name="Make Payment">
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <PaymentStep step={step} setStep={setStep} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Payment Logs">
                  <div className="basic-card">
                    <h4 className="box-title">Payment Logs</h4>
                    <PaymentHistory />
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

export default withAuth(MakePayment);
