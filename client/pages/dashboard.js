import React from 'react';
import CoinTrade from '../components/CoinTrade';
import RecentExchange from '../components/RecentExchange';
import Refferal from '../components/Refferal';
import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import Welcome from '../components/Welcome';
import withAuth from '../hoc/withAuth';

const Dashboard = ({ userData, settings }) => (
  <>
    <UserHeader />
    <Sidebar settings={settings} />
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
              <CoinTrade />
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-sm-12">
            <div className="basic-card mb-30">
              <h4 className="box-title">Bitcoin</h4>
            </div>
            <div className="basic-card">
              <h4 className="box-title">Recent Exchange</h4>
              <RecentExchange />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuth(Dashboard);
