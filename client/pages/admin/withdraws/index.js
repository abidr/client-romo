import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import WithdrawHistoryAdmin from '../../../components/admin/withdraw/WithdrawHistoryAdmin';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Withdraws = ({ userData, settings }) => (
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
              <TabModule icon={<BiErrorCircle />} name="History">
                <div className="basic-card">
                  <h4 className="box-title">Withdraw History</h4>
                  <WithdrawHistoryAdmin />
                </div>
              </TabModule>
            </UserTab>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuthAdmin(Withdraws);
