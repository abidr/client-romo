import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BiCog, BiDollarCircle, BiHomeSmile, BiNotepad,
  BiPaperPlane, BiPlusCircle, BiStore, BiTransferAlt, BiWallet
} from 'react-icons/bi';
import useSidebar from '../data/useSidebar';
import SidebarMenu from './SidebarMenu';

const Sidebar = ({ userData, settings }) => {
  const sidebar = useSidebar();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (sidebar?.visible) {
      sidebar?.toggle();
    }
  }, [router.asPath]);

  return (
    <>
      <div
        className={`backdrop ${sidebar?.visible ? 's-visible' : 's-hidden'}`}
        onClick={() => sidebar?.toggle()}
        role="button"
        aria-hidden="true"
      />
      <div className={`sidebar ${sidebar?.visible ? 's-visible' : 's-hidden'}`}>
        <a href="/" className="brand-logo">
          <img src={`${settings?.apiUrl?.param1}/public/${settings?.logo?.param1}`} alt="" />
        </a>
        <button type="button" className="closeBtn" onClick={() => sidebar?.toggle()}>
          <span aria-hidden="true">×</span>
          <span className="sr-only">{t('Close')}</span>
        </button>
        <div className="menu">
          <ul>
            <SidebarMenu href="/dashboard">
              <BiHomeSmile />
              <span>{t('Dashboard')}</span>
            </SidebarMenu>
            {!(userData?.role === 3) && (
            <SidebarMenu href="/add-money">
              <BiPlusCircle />
              <span>{t('Add Money')}</span>
            </SidebarMenu>
            )}
            <SidebarMenu href="/send-money">
              <BiPaperPlane />
              <span>{t('Transfer')}</span>
            </SidebarMenu>
            {!(userData?.role === 3) && (
            <SidebarMenu href="/withdraw">
              <BiWallet />
              <span>{t('Withdraw')}</span>
            </SidebarMenu>
            )}
            <SidebarMenu href="/exchange">
              <BiTransferAlt />
              <span>{t('Exchange')}</span>
            </SidebarMenu>
            {!(userData?.role === 3) && (
            <SidebarMenu href="/make-payment">
              <BiDollarCircle />
              <span>{t('Payment')}</span>
            </SidebarMenu>
            )}
            {!(userData?.role === 3) && (
            <SidebarMenu href="/bill-pay">
              <BiNotepad />
              <span>{t('Utility Bill')}</span>
            </SidebarMenu>
            )}
            {userData?.role === 3 && (
            <SidebarMenu href="/agent">
              <BiStore />
              <span>{t('Agent Panel')}</span>
            </SidebarMenu>
            )}
            {userData?.role === 2 && (
            <SidebarMenu href="/merchant">
              <BiStore />
              <span>{t('Merchant')}</span>
            </SidebarMenu>
            )}
            <SidebarMenu href="/settings">
              <BiCog />
              <span>{t('Settings')}</span>
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
};

export default Sidebar;
