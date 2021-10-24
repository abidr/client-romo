import React from 'react';
import { BiAnalyse, BiErrorCircle } from 'react-icons/bi';
import KycList from '../../../components/admin/user/KycList';
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
                  <KycList />
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
