/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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
import useWallet from '../data/useWallet';
import withAuth from '../hoc/withAuth';
import usd from '../images/usd.png';

const AddMoney = () => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const { data, loading } = useCurrency();
  const { data: walletData, loading: walletLoading } = useWallet();

  useEffect(() => {
    setSelectedCurrency(data?.data[0]);
  }, [data]);

  useEffect(() => {
    const walletFind = walletData?.find((wallet) => wallet.currency === selectedCurrency?.symbol);
    setCurrentBalance(walletFind?.balance);
  }, [selectedCurrency, walletData]);

  if (loading || walletLoading) {
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
                            <label htmlFor="currencySelector">Wallet</label>
                            <Dropdown id="currencySelector">
                              <Dropdown.Toggle className="bttn-small btn-emt" variant="link">
                                <Image src={usd.src} rounded />
                                {selectedCurrency?.symbol}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {data?.data?.map((currency) => (
                                  <Dropdown.Item
                                    key={currency.id}
                                    onClick={() => setSelectedCurrency(currency)}
                                  >
                                    <Image src={currency.icon} rounded />
                                    {currency.symbol}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                              <p className="available-balance">
                                Available Balance:
                                <span>
                                  {' '}
                                  {currentBalance}
                                  {' '}
                                  {selectedCurrency?.symbol}
                                </span>
                              </p>
                            </Dropdown>
                          </div>
                          <div className="currency-amount">
                            <label>Amount</label>
                            <input type="text" />
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
