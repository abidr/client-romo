/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Col, Nav, Row, Tab
} from 'react-bootstrap';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import WithdrawHistory from '../components/withdraws/WithdrawHistory';
import WithdrawStep from '../components/withdraws/WithdrawStep';
import withAuth from '../hoc/withAuth';

const Withdraw = ({ settings }) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <UserHeader />
      <Sidebar settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <h3 className="mb-30">Withdraw Money</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime placeat sit?</p>
                    <Nav variant="pills" className="flex-column mb-30">
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="first">
                          <BiWallet />
                          Withdraw
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="second">
                          <BiErrorCircle />
                          Withdraw Logs
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="deposit-box basic-card">
                          <TransactionSteps step={step} />
                          <WithdrawStep step={step} setStep={setStep} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="basic-card">
                          <h4 className="box-title">Withdraw Logs</h4>
                          <WithdrawHistory />
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
};

export default withAuth(Withdraw);
