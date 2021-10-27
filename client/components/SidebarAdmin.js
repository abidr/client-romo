import React from 'react';
import {
  BiCog, BiDollarCircle, BiHomeSmile, BiPaintRoll,
  BiPaperPlane, BiPlusCircle, BiStore, BiTransferAlt, BiUser, BiWallet
} from 'react-icons/bi';
import SidebarMenu from './SidebarMenu';

const SidebarAdmin = ({ settings }) => (
  <>
    <div className="sidebar">
      <a href="/" className="brand-logo">
        <img src={`${settings?.apiUrl?.param1}/public/${settings?.logo?.param1}`} alt="" />
      </a>
      <div className="menu">
        <ul>
          <SidebarMenu href="/admin/dashboard">
            <BiHomeSmile />
            <span>Dashboard</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/deposits">
            <BiPlusCircle />
            <span>Deposits</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/transfers">
            <BiPaperPlane />
            <span>Transfers</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/withdraws">
            <BiWallet />
            <span>Withdraws</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/exchanges">
            <BiTransferAlt />
            <span>Exchanges</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/pays">
            <BiDollarCircle />
            <span>Payments</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/merchants">
            <BiStore />
            <span>Merchants</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/users">
            <BiUser />
            <span>Users</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/settings">
            <BiCog />
            <span>Settings</span>
          </SidebarMenu>
          <SidebarMenu href="/admin/builder">
            <BiPaintRoll />
            <span>Site Builder</span>
          </SidebarMenu>
        </ul>
        <div className="copyright">
          {settings?.site?.param1}
          {' '}
          Admin Panel
        </div>
      </div>
    </div>
  </>
);

export default SidebarAdmin;
