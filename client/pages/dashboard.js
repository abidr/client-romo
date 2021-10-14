import React from 'react';
import DepositHistory from '../components/deposit/DepositHistory';
import Refferal from '../components/Refferal';
import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import Wallet from '../components/Wallet';
import Welcome from '../components/Welcome';
import withAuth from '../hoc/withAuth';

const Dashboard = ({ userData, settings }) => (
  <>
    <UserHeader />
    <Sidebar userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row mb-40">
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="basic-card ">
              <div className="row">
                <div className="col-xl-6 col-md-3 col-sm-6">
                  <Welcome userData={userData} settings={settings} />
                </div>
                <div className="col-xl-6 col-md-6 col-sm-6">
                  <Refferal userData={userData} settings={settings} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-sm-12">
            <div className="tradeCoin basic-card">
              <h4 className="box-title">Wallets</h4>
              <Wallet />
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-12">
            <div className="basic-card">
              <h4 className="box-title">Recent Deposits</h4>
              <DepositHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuth(Dashboard);
