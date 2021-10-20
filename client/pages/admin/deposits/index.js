import React from 'react';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import DepositHistoryAdmin from '../../../components/admin/deposit/DepositHistoryAdmin';
import MethodsList from '../../../components/admin/deposit/MethodsList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Deposits = ({ userData, settings }) => (
  <>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <UserTab
              title="Deposits"
              description="Manage all deposits of your users from this panel."
            >
              <TabModule icon={<BiErrorCircle />} name="History">
                <div className="basic-card">
                  <h4 className="box-title">Deposit History</h4>
                  <DepositHistoryAdmin />
                </div>
              </TabModule>
              <TabModule icon={<BiWallet />} name="Gateways">
                <div className="basic-card">
                  <h4 className="box-title">Payment Gateways</h4>
                  <MethodsList />
                </div>
              </TabModule>
            </UserTab>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuthAdmin(Deposits);
