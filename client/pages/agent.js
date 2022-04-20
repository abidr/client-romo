/* eslint-disable max-len */
import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle } from 'react-icons/bi';
import AgentHistory from '../components/agent/AgentHistory';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Agent = ({ userData, settings }) => {
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
              </UserTab>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Agent);
