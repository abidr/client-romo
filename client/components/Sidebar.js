import React from 'react';
import { BiCog, BiDollarCircle, BiHomeSmile, BiMoney, BiPaperPlane, BiPlusCircle, BiTransferAlt, BiTrendingUp, BiWallet } from 'react-icons/bi';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {

  return (
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
          <SidebarMenu href="/request-money">
            <BiMoney />
            <span>Request Money</span>
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
          <SidebarMenu href="/transfer">
            <BiTrendingUp />
            <span>Transfer</span>
          </SidebarMenu>
          <SidebarMenu href="/settings">
            <BiCog />
            <span>Settings</span>
          </SidebarMenu>
        </ul>
        <div className="copyright">&copy;Wallet</div>
      </div>
    </div>
  </>
)};

export default Sidebar;
