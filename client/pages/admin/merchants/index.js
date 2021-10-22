import React from 'react';
import { BiAnalyse, BiErrorCircle, BiLeftTopArrowCircle } from 'react-icons/bi';
import MerchantList from '../../../components/admin/merchant/MerchantList';
import RequestsList from '../../../components/admin/merchant/RequestsList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Merchants = ({ userData, settings }) => (
  <>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <UserTab
              title="Merchants"
              description="Manage your merchants from this panel."
            >
              <TabModule icon={<BiAnalyse />} name="Merchant List">
                <div className="basic-card">
                  <h4 className="box-title">Merchant List</h4>
                  <MerchantList />
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

export default withAuthAdmin(Merchants);
