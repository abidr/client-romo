/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Col, Dropdown, Image, Nav, Row, Tab
} from 'react-bootstrap';
import { BiErrorCircle, BiRightArrowAlt, BiWallet } from 'react-icons/bi';
import DepositHistory from '../components/history/DepositHistory';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import useCurrency from '../data/useCurrency';
import withAuth from '../hoc/withAuth';
import bitcoin from '../images/bitcoin.png';
import bnb from '../images/bnb.png';
import doge from '../images/doge.png';
import ethereum from '../images/ethereum.png';
import fil from '../images/fil.png';
import usd from '../images/usd.png';

const AddMoney = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { data, loading } = useCurrency();
  if (loading) {
    return <Loader />;
  }
  return (
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
                          <TransactionSteps />
                          <div className="currency-amount">
                            <label htmlFor="currencySelector">Currency</label>
                            <Dropdown id="currencySelector">
                              <Dropdown.Toggle className="bttn-small btn-emt" variant="link">
                                <Image src={usd.src} rounded />
                                {selectedCurrency}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSelectedCurrency('USD')}>
                                  <Image src={usd.src} rounded />
                                  USD
                                </Dropdown.Item>
                                {data?.data?.map((currency) => (
                                  <Dropdown.Item
                                    key={currency.id}
                                    onClick={() => setSelectedCurrency(currency.symbol)}
                                  >
                                    <Image src={currency.icon} rounded />
                                    {currency.symbol}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                              <p className="available-balance">
                                Available balance:
                                <span>$2,654.48</span>
                              </p>
                            </Dropdown>
                          </div>
                          <div className="currency-amount">
                            <label>Enter Amount</label>
                            <input type="text" />
                          </div>
                          <div className="currency-amount">
                            <label>Payment Method</label>
                            <Dropdown>
                              <Dropdown.Toggle className="bttn-small btn-emt" variant="link">
                                <Image src={bitcoin} rounded />
                                BTC
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">
                                  <Image src={usd} rounded />
                                  USD
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                  <Image src={ethereum} rounded />
                                  ETH
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                  <Image src={fil} rounded />
                                  FIL
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-4">
                                  <Image src={bnb} rounded />
                                  BNB
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-5">
                                  <Image src={doge} rounded />
                                  DOGE
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div className="bttns mt-30">
                            <a href="/#" className="bttn-mid btn-ylo">
                              <BiRightArrowAlt />
                              Next
                            </a>
                          </div>
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
