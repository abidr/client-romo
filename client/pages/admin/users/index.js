import React from 'react';
import { BiAnalyse, BiErrorCircle, BiLeftTopArrowCircle } from 'react-icons/bi';
import MerchantList from '../../../components/admin/merchant/MerchantList';
import RequestsList from '../../../components/admin/merchant/RequestsList';
import UserList from '../../../components/admin/user/UserList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Users = ({ userData, settings }) => (
  <>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <UserTab
              title="Users"
              description="Manage your users from this panel."
            >
              <TabModule icon={<BiAnalyse />} name="User List">
                <div className="basic-card">
                  <h4 className="box-title">User List</h4>
                  <UserList />
                </div>
              </TabModule>
              <TabModule icon={<BiErrorCircle />} name="Pending Verification">
                <div className="basic-card">
                  <h4 className="box-title">Pending Verification</h4>
                  <MerchantList pending />
                </div>
              </TabModule>
              <TabModule icon={<BiLeftTopArrowCircle />} name="Payment Requests">
                <div className="basic-card">
                  <h4 className="box-title">Payment Requests</h4>
                  <RequestsList />
                </div>
              </TabModule>
            </UserTab>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuthAdmin(Users);
