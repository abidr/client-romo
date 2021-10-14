/* eslint-disable max-len */
import React, { useState } from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import WithdrawHistory from '../components/withdraws/WithdrawHistory';
import WithdrawStep from '../components/withdraws/WithdrawStep';
import withAuth from '../hoc/withAuth';

const Withdraw = ({ userData, settings }) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <UserHeader />
      <Sidebar userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <UserTab
                title="Withdraw Money"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit?"
              >
                <TabModule icon={<BiWallet />} name="Withdraw">
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <WithdrawStep step={step} setStep={setStep} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Withdraw Logs">
                  <div className="basic-card">
                    <h4 className="box-title">Withdraw Logs</h4>
                    <WithdrawHistory />
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

export default withAuth(Withdraw);
