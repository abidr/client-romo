/* eslint-disable max-len */
import { useRouter } from 'next/router';
import React from 'react';
import {
  Col, Nav, Row, Tab
} from 'react-bootstrap';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Kyc from '../components/settings/Kyc';
import LinkedAcc from '../components/settings/LinkedAcc';
import ProfileSettings from '../components/settings/ProfileSettings';
import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Settings = ({ userData }) => {
  const router = useRouter();
  const { tab } = router.query;

  return (
    <>
      <UserHeader />
      <Sidebar />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Tab.Container id="settings" defaultActiveKey={tab || 'profile'}>
                <Row>
                  <Col sm={3}>
                    <h3 className="mb-30">Settings</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit?</p>
                    <Nav variant="pills" className="flex-column mb-30">
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="profile">
                          <BiWallet />
                          Account Settings
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="kyc">
                          <BiErrorCircle />
                          KYC
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="linked">
                          <BiErrorCircle />
                          Linked Accounts
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="profile">
                        <ProfileSettings userData={userData} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="kyc">
                        <Kyc />
                      </Tab.Pane>
                      <Tab.Pane eventKey="linked">
                        <LinkedAcc />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Settings);
