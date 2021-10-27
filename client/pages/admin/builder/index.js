import React from 'react';
import { BiListCheck } from 'react-icons/bi';
import FooterMenuBuilder from '../../../components/admin/builder/FooterMenuBuilder';
import LogoFavicon from '../../../components/admin/builder/LogoFavicon';
import MenuBuilder from '../../../components/admin/builder/MenuBuilder';
import PageList from '../../../components/admin/builder/PageList';
import SidebarAdmin from '../../../components/SidebarAdmin';
import TabModule from '../../../components/tabs/TabModule';
import UserTab from '../../../components/tabs/UserTab';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import withAuthAdmin from '../../../hoc/withAuthAdmin';

const Builder = ({ userData, settings }) => (
  <>
    <UserHeaderAdmin />
    <SidebarAdmin userData={userData} settings={settings} />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <UserTab
              title="Site Builder"
              description="Manage UI of your site from this panel."
            >
              <TabModule icon={<BiListCheck />} name="Pages">
                <div className="basic-card">
                  <h4 className="box-title">Pages</h4>
                  <PageList />
                </div>
              </TabModule>
              <TabModule icon={<BiListCheck />} name="Logo & Favicon">
                <div className="basic-card">
                  <h4 className="box-title">Logo & Favicon</h4>
                  <LogoFavicon />
                </div>
              </TabModule>
              <TabModule icon={<BiListCheck />} name="Main Menu">
                <div className="basic-card">
                  <h4 className="box-title">Main Menu</h4>
                  <MenuBuilder />
                </div>
              </TabModule>
              <TabModule icon={<BiListCheck />} name="Footer Menu">
                <div className="basic-card">
                  <h4 className="box-title">Footer Menu</h4>
                  <FooterMenuBuilder />
                </div>
              </TabModule>
            </UserTab>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default withAuthAdmin(Builder);
