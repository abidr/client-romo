import React from 'react';
import {
  BiCog, BiDollarCircle, BiHomeSmile, BiPaperPlane, BiPlusCircle, BiTransferAlt, BiWallet
} from 'react-icons/bi';
import SidebarMenu from './SidebarMenu';

const Sidebar = ({ settings }) => (
  <>
    <div className="sidebar">
      {/* <a href="/" className="brand-logo">
        <img src={siteLogo.src} alt="" />
      </a> */}
      <div className="menu">
        <ul>
          <SidebarMenu href="/dashboard">
            <BiHomeSmile />
            <span>Dashboard</span>
          </SidebarMenu>
          <SidebarMenu href="/add-money">
            <BiPlusCircle />
            <span>Add Money</span>
          </SidebarMenu>
          <SidebarMenu href="/send-money">
            <BiPaperPlane />
            <span>Send Money</span>
          </SidebarMenu>
          <SidebarMenu href="/withdraw">
            <BiWallet />
            <span>Withdraw</span>
          </SidebarMenu>
          <SidebarMenu href="/exchange">
            <BiTransferAlt />
            <span>Currency Exchanger</span>
          </SidebarMenu>
          <SidebarMenu href="/make-payment">
            <BiDollarCircle />
            <span>Make Payment</span>
          </SidebarMenu>
          <SidebarMenu href="/settings">
            <BiCog />
            <span>Settings</span>
          </SidebarMenu>
        </ul>
        <div className="copyright">
          &copy;
          {' '}
          {settings?.site?.param1}
        </div>
      </div>
    </div>
  </>
);

export default Sidebar;
