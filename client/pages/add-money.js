/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Col, Nav, Row, Tab
} from 'react-bootstrap';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import DepositHistory from '../components/deposit/DepositHistory';
import DepositStep from '../components/deposit/DepositStep';
import Sidebar from '../components/Sidebar';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

const AddMoney = ({ settings }) => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      setStep(3);
    }
  }, []);

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
                    <h3 className="mb-30">Add Money</h3>
                    <p className="mb-30">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa incidunt, qui, id consequatur unde debitis in fuga vel accusamus architecto hic error veritatis expedita recusandae aliquid cupiditate maxime</p>
                    <Nav variant="pills" className="flex-column mb-30">
                      <Nav.Item className="mb-10">
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="first">
                          <BiWallet />
                          Deposit
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="bttn-mid btn-grad w-100" eventKey="second">
                          <BiErrorCircle />
                          History
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="deposit-box basic-card">
                          <TransactionSteps step={step} />
                          <DepositStep step={step} setStep={setStep} status={status} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="basic-card">
                          <h4 className="box-title">Deposit Logs</h4>
                          <DepositHistory />
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

export default withAuth(AddMoney);
