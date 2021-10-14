/* eslint-disable max-len */
import { useRouter } from 'next/router';
import React from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Kyc from '../components/settings/Kyc';
import ProfileSettings from '../components/settings/ProfileSettings';
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
                  <ProfileSettings userData={userData} />
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="Store Settings">
                  <Kyc />
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
