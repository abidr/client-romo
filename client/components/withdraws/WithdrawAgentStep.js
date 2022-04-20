/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';
import { Dropdown, Image, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import {
  BiCheckCircle, BiLeftArrowAlt, BiRightArrowAlt
} from 'react-icons/bi';
import request from '../../config/api';
import useCurrency from '../../data/useCurrency';
import useWallet from '../../data/useWallet';
import { withdrawRequestAgent } from '../../lib/withdrawRequest';
import inputNumber from '../../utils/inputNumber';
import Loader from '../Loader';

const WithdrawAgentStep = ({ step, setStep }) => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [agentId, setAgentId] = useState('');
  const [actionLoader, setActionLoader] = useState(false);
  const [confirmData, setConfirmData] = useState();
  const { data, loading } = useCurrency();
  const { data: walletData, loading: walletLoading } = useWallet();
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedCurrency(data?.data[0]);
  }, [data]);

  useEffect(() => {
    const walletFind = walletData?.find((wallet) => wallet.currency === selectedCurrency?.symbol);
    setCurrentBalance(walletFind?.balance);
  }, [selectedCurrency, walletData]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleAgentConfirm = async () => {
    try {
      setActionLoader(true);
      const { data: confirmDataGet } = await request.post('/agent/confirm', {
        agentId,
        amount
      });
      setConfirmData(confirmDataGet);
      setStep(step + 1);
      setActionLoader(false);
      return null;
    } catch (err) {
      setActionLoader(false);
      cogoToast.error(err.response.data.message, { position: 'bottom-center' });
      return null;
    }
  };

  const handleSubmit = () => {
    withdrawRequestAgent({
      agentId,
      amount: parseFloat(amount, 10),
      currency: selectedCurrency?.symbol,
    }, setActionLoader, setStep);
  };

  if (loading || walletLoading) {
    return <Loader />;
  }

  if (step === 1) {
    return (
      <>
        <form onSubmit={handleNext}>
          <div className="currency-amount">
            <label htmlFor="currencySelector">{t('Wallet')}</label>
            <Dropdown id="currencySelector">
              <Dropdown.Toggle className="bttn-small btn-emt" variant="link">
                <Image src={selectedCurrency?.icon} rounded />
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
                {t('Available Balance')}
                :
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
            <label>{t('Amount')}</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="text"
              required
              onPress={inputNumber}
            />
          </div>
          <div className="currency-amount">
            <label>{t('Agent ID')}</label>
            <input
              onChange={(e) => setAgentId(e.target.value)}
              value={agentId}
              type="text"
              required
            />
          </div>
          <div className="bttns mt-30">
            <button
              type="button"
              onClick={() => handleAgentConfirm()}
              className="bttn-mid btn-ylo"
              disabled={actionLoader}
            >
              {actionLoader ? (
                <>
                  <Spinner animation="border" role="status" size="sm" />
                  {' '}
                  {t('Processing')}
                </>
              ) : (
                <>
                  <BiRightArrowAlt />
                  {t('Next')}
                </>
              )}
            </button>
          </div>
        </form>
      </>
    );
  } if (step === 2) {
    return (
      <>
        <div className="transaction-review">
          <h4>{t('Review Details')}</h4>
          <Table striped hover responsive className="dark-color">
            <tbody>
              <tr>
                <td>{t('Agent ID')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {confirmData?.agent?.agentId}
                </td>
              </tr>
              <tr>
                <td>{t('Agent Name')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {confirmData?.agent?.name}
                </td>
              </tr>
              <tr>
                <td>{t('Agent Address')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {confirmData?.agent?.address}
                </td>
              </tr>
              <tr>
                <td>{t('Amount')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {amount}
                  {' '}
                  {selectedCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>
                  {t('Fee')}
                </td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {`${confirmData?.fee}`}
                  {' '}
                  {selectedCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>{t('Total')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {`${confirmData?.total}`}
                  {' '}
                  {selectedCurrency?.symbol}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="bttns mt-30">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="bttn-mid btn-grey mr-10"
          >
            <BiLeftArrowAlt />
            {t('Back')}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="bttn-mid btn-ylo"
            disabled={actionLoader}
          >
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                {t('Processing')}
              </>
            ) : (
              <>
                <BiRightArrowAlt />
                {t('Withdraw')}
              </>
            )}
          </button>
        </div>
      </>
    );
  } if (step === 3) {
    return (
      <div className="transaction-success">
        <BiCheckCircle color="green" size={70} />
        <h2>
          {t('Withdraw Request Submitted')}
        </h2>
        <p>
          {t('We will review your withdraw request and send the fund to your desired account')}
          ,
          {' '}
          {t('please allow upto 24 hours for us to review')}
          .
        </p>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bttn-mid btn-ylo"
        >
          {t('Make Another Withdraw')}
        </button>
      </div>
    );
  }
  return <></>;
};

export default WithdrawAgentStep;
