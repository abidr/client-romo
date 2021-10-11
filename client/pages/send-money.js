import React, { useState } from 'react';
import {
  Col, Nav, Row, Tab
} from 'react-bootstrap';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import Sidebar from '../components/Sidebar';
import TransactionSteps from '../components/TransactionSteps';
import ReceiveHistory from '../components/transfers/ReceiveHistory';
import SendHistory from '../components/transfers/SendHistory';
import TransferStep from '../components/transfers/TransferStep';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const Send = ({ settings }) => {
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
                    <h3 className="mb-30">Send Money</h3>
                    <p className="mb-30">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime</p>
                    <Nav variant="pills" className="flex-column mb-30">
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="first">
                          <BiWallet />
                          Send Money
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="second">
                          <BiErrorCircle />
                          Send Log
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="third">
                          <BiErrorCircle />
                          Receive Log
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="deposit-box basic-card">
                          <TransactionSteps step={step} />
                          <TransferStep step={step} setStep={setStep} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="basic-card">
                          <h4 className="box-title">Send Logs</h4>
                          <SendHistory />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="basic-card">
                          <h4 className="box-title">Receive Logs</h4>
                          <ReceiveHistory />
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

export default withAuth(Send);
