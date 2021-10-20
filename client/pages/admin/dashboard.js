import React from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import UserHeaderAdmin from '../../components/UserHeaderAdmin';
import withAuthAdmin from '../../hoc/withAuthAdmin';

const Dashboard = ({ userData, settings }) => (
  <div>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
  </div>
);

export default withAuthAdmin(Dashboard);
