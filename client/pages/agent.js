/* eslint-disable max-len */
import Head from 'next/head';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle } from 'react-icons/bi';
import AgentHistory from '../components/agent/AgentHistory';
import AgentSettleHistory from '../components/agent/AgentSettleHistory';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import TransferStep from '../components/transfers/TransferStep';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Agent = ({ userData, settings }) => {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t('Agent')}
          {' '}
          -
          {' '}
          {settings?.site?.param1}
        </title>
        <link rel="icon" href={`${settings?.apiUrl?.param1}/public/${settings?.logo?.param2}`} />
      </Head>
      <UserHeader />
      <Sidebar userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <UserTab
                title={t('Agent Panel')}
                description={t('Manage your agent settings from here')}
              >
                <TabModule icon={<BiErrorCircle />} name={t('Receive Logs')}>
                  <div className="basic-card">
                    <h4 className="box-title">{t('Receive Logs')}</h4>
                    <AgentHistory />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name={t('Credit Money')}>
                  <div className="deposit-box basic-card">
                    <TransactionSteps step={step} />
                    <TransferStep step={step} setStep={setStep} />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name={t('Settlements')}>
                  <div className="basic-card">
                    <h4 className="box-title">{t('Settlements')}</h4>
                    <AgentSettleHistory />
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

export default withAuth(Agent);
