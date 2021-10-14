import React, { useState } from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import ReceiveHistory from '../components/transfers/ReceiveHistory';
import SendHistory from '../components/transfers/SendHistory';
import TransferStep from '../components/transfers/TransferStep';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Send = ({ userData, settings }) => {
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
                title="Send Money"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime"
              >
                <TabModule icon={<BiWallet />} name="Send Money">
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <TransferStep step={step} setStep={setStep} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Send Logs">
                  <div className="basic-card">
                    <h4 className="box-title">Send Logs</h4>
                    <SendHistory />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Receive Logs">
                  <div className="basic-card">
                    <h4 className="box-title">Receive Logs</h4>
                    <ReceiveHistory />
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

export default withAuth(Send);
