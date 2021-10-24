import React from 'react';
import { BiListCheck } from 'react-icons/bi';
import MenuBuilder from '../../../components/admin/builder/MenuBuilder';
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
              <TabModule icon={<BiListCheck />} name="Main Menu">
                <div className="basic-card">
                  <h4 className="box-title">Main Menu</h4>
                  <MenuBuilder />
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
