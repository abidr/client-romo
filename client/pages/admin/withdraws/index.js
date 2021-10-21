import { useRouter } from 'next/router';
import React from 'react';
import {
  BiAnalyse, BiErrorCircle, BiPlusCircle, BiWallet
} from 'react-icons/bi';
import WithdrawHistoryAdmin from '../../../components/admin/withdraw/WithdrawHistoryAdmin';
import WithdrawMethodsList from '../../../components/admin/withdraw/WithdrawMethodsList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Withdraws = ({ userData, settings }) => {
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
                title="Withdraws"
                description="Manage all withdraws of your users from this panel."
              >
                <TabModule icon={<BiAnalyse />} name="Pending">
                  <div className="basic-card">
                    <h4 className="box-title">Pending Withdraws</h4>
                    <WithdrawHistoryAdmin pending />
                  </div>
                </TabModule>
                <TabModule icon={<BiErrorCircle />} name="History">
                  <div className="basic-card">
                    <h4 className="box-title">Withdraw History</h4>
                    <WithdrawHistoryAdmin />
                  </div>
                </TabModule>
                <TabModule icon={<BiWallet />} name="Methods">
                  <div className="basic-card">
                    <h4 className="box-title">Withdraw Methods</h4>
                    <WithdrawMethodsList />
                    <button
                      type="button"
                      className="bttn-mid btn-primary btn-new mt-20"
                      onClick={() => router.push('/admin/withdraws/method/new')}
                    >
                      <BiPlusCircle />
                      Add New Method
                    </button>
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

export default withAuthAdmin(Withdraws);
