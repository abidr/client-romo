import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import TransferHistoryAdmin from '../../../components/admin/transfer/TransferHistoryAdmin';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Transfers = ({ userData, settings }) => (
  <>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <UserTab
              title="Transfers"
              description="Manage all transfers of your users from this panel."
            >
              <TabModule icon={<BiErrorCircle />} name="History">
                <div className="basic-card">
                  <h4 className="box-title">Transfer History</h4>
                  <TransferHistoryAdmin />
                </div>
              </TabModule>
            </UserTab>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuthAdmin(Transfers);
