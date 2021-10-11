/* eslint-disable max-len */
import React from 'react';
import {
  Col, Form, FormControl, InputGroup, Nav, Row, Tab
} from 'react-bootstrap';
import { BiDollar, BiErrorCircle, BiWallet } from 'react-icons/bi';
import Kyc from '../components/settings/Kyc';
import ProfileSettings from '../components/settings/ProfileSettings';
import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Settings = ({ userData }) => (
  <>
    <UserHeader />
    <Sidebar />
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <h3 className="mb-30">Settings</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit?</p>
                  <Nav variant="pills" className="flex-column mb-30">
                    <Nav.Item className="mb-10">
                      <Nav.Link className="bttn-mid btn-grad w-100" eventKey="first">
                        <BiWallet />
                        Account Setting
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-10">
                      <Nav.Link className="bttn-mid btn-grad w-100" eventKey="second">
                        <BiErrorCircle />
                        KYC
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mb-10">
                      <Nav.Link className="bttn-mid btn-grad w-100" eventKey="third">
                        <BiErrorCircle />
                        Linked Account
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <ProfileSettings userData={userData} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Kyc />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div className="basic-card">
                        <h4 className="box-title">Linked Account</h4>
                        <div className="settings-box">
                          <div className="single-account-linked">
                            <Form.Label className="d-block">Paypal USD</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1"><BiDollar /></InputGroup.Text>
                              <FormControl
                                value="paypal@tradyum.com"
                                aria-describedby="basic-addon1"
                              />
                            </InputGroup>
                          </div>
                          <div className="single-account-linked">
                            <Form.Label className="d-block">Paypal USD</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1"><BiDollar /></InputGroup.Text>
                              <FormControl
                                value="paypal@tradyum.com"
                                aria-describedby="basic-addon1"
                              />
                            </InputGroup>
                          </div>
                          <div className="single-account-linked">
                            <Form.Label className="d-block">Paypal USD</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1"><BiDollar /></InputGroup.Text>
                              <FormControl
                                value="paypal@tradyum.com"
                                aria-describedby="basic-addon1"
                              />
                            </InputGroup>
                          </div>
                          <div className="single-account-linked">
                            <Form.Label className="d-block">Paypal USD</Form.Label>
                            <InputGroup className="mb-3">
                              <InputGroup.Text id="basic-addon1"><BiDollar /></InputGroup.Text>
                              <FormControl
                                value="paypal@tradyum.com"
                                aria-describedby="basic-addon1"
                              />
                            </InputGroup>
                          </div>
                          <button type="button" className="bttn-mid btn-ylo">
                            <BiErrorCircle />
                            Update KYC
                          </button>
                        </div>
                      </div>
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

export default withAuth(Settings);
