import { useRouter } from 'next/router';
import React from 'react';
import {
  BiCog, BiGroup, BiPlusCircle, BiPound, BiPurchaseTag, BiShuffle
} from 'react-icons/bi';
import AdjSettings from '../../../components/admin/settings/AdjSettings';
import ApiSettings from '../../../components/admin/settings/ApiSettings';
import GeneralSettings from '../../../components/admin/settings/GeneralSettings';
import RefferalSettings from '../../../components/admin/settings/RefferalSettings';
import WalletList from '../../../components/admin/settings/WalletList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Settings = ({ userData, settings }) => {
  const router = useRouter();
  return (
    <>
      <UserHeaderAdmin />
      <SidebarAdmin userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <UserTab
                title="Settings"
                description="Manage site settings from this panel."
              >
                <TabModule icon={<BiCog />} name="General">
                  <div className="basic-card">
                    <h4 className="box-title">General Settings</h4>
                    <GeneralSettings settings={settings} />
                  </div>
                </TabModule>
                <TabModule icon={<BiPound />} name="Wallets">
                  <div className="basic-card">
                    <h4 className="box-title">Wallets</h4>
                    <WalletList settings={settings} />
                    <button
                      type="button"
                      className="bttn-mid btn-primary btn-new mt-20"
                      onClick={() => router.push('/admin/settings/wallet/new')}
                    >
                      <BiPlusCircle />
                      Add New Wallet
                    </button>
                  </div>
                </TabModule>
                <TabModule icon={<BiGroup />} name="Refferal">
                  <div className="basic-card">
                    <h4 className="box-title">Refferal</h4>
                    <RefferalSettings settings={settings} />
                  </div>
                </TabModule>
                <TabModule icon={<BiPurchaseTag />} name="Fees">
                  <div className="basic-card">
                    <h4 className="box-title">Fees</h4>
                    <AdjSettings settings={settings} />
                  </div>
                </TabModule>
                <TabModule icon={<BiShuffle />} name="APIs">
                  <div className="basic-card">
                    <h4 className="box-title">APIs</h4>
                    <ApiSettings settings={settings} />
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

export default withAuthAdmin(Settings);
