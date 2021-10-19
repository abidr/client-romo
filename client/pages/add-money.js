/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import DepositHistory from '../components/deposit/DepositHistory';
import DepositStep from '../components/deposit/DepositStep';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const AddMoney = ({ userData, settings }) => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      setStep(3);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Deposit -
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
                title="Add Money"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime"
              >
                <TabModule icon={<BiWallet />} name="Deposit">
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <DepositStep step={step} setStep={setStep} status={status} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="History">
                  <div className="basic-card">
                    <h4 className="box-title">Deposit Logs</h4>
                    <DepositHistory />
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

export default withAuth(AddMoney);
