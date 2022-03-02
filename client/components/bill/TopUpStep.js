/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Dropdown, Image, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import {
  BiCheckCircle, BiLeftArrowAlt, BiRightArrowAlt
} from 'react-icons/bi';
import PhoneInput from 'react-phone-input-2';
import useCurrency from '../../data/useCurrency';
import useWallet from '../../data/useWallet';
import topUpRequest, { topUpReviewRequest } from '../../lib/billRequest';
import Loader from '../Loader';

const TopUpStep = ({ step, setStep }) => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState();
  const [rates, setRates] = useState();
  const [number, setNumber] = useState('225');
  const [country, setCountry] = useState('ci');
  const [actionLoader, setActionLoader] = useState(false);
  const { data, loading } = useCurrency();
  const { data: walletData, loading: walletLoading } = useWallet();
  const { t } = useTranslation();

  useEffect(() => {
    const findIndex = data?.data?.findIndex((item) => item.symbol === 'XOF');
    setSelectedCurrency(data?.data[findIndex]);
  }, [data]);

  useEffect(() => {
    const walletFind = walletData?.find((wallet) => wallet.currency === selectedCurrency?.symbol);
    setCurrentBalance(walletFind?.balance);
  }, [selectedCurrency, walletData]);

  const handleNext = (e) => {
    e.preventDefault();
    topUpReviewRequest({
      country: country.toUpperCase(),
      number,
      amount: parseFloat(amount, 10),
      currency: 'XOF',
    }, setActionLoader, setStep, setRates);
  };

  const handleSubmit = () => {
    topUpRequest({
      country: country.toUpperCase(),
      number,
      amount: parseFloat(amount, 10),
      currency: 'XOF',
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
            />
          </div>

          <div className="currency-amount">
            <label>{t('Phone Number')}</label>
            <PhoneInput
              enableLongNumbers
              country="ci"
              value={number}
              onChange={(value, count) => {
                setNumber(value);
                setCountry(count.countryCode);
              }}
            />
          </div>

          <div className="bttns mt-30">
            <button
              type="submit"
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
                <td>{t('Phone Number')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {number}
                </td>
              </tr>
              <tr>
                <td>{t('Operator')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {rates?.name}
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
                <td>{t('Exchange Rate')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {rates?.fxRate}
                  {' '}
                  {rates?.currencyCode}
                </td>
              </tr>
              <tr>
                <td>{t('Fee')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {rates?.fee}
                  {' '}
                  {rates?.currencyCode}
                </td>
              </tr>
              <tr>
                <td>{t('Receiving (Tentative)')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {rates?.receiving}
                  {' '}
                  {rates?.currencyCode}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <p style={{ paddingTop: '15px' }}>
          {t("Please Note: You'll receive top up in your local currency but we'll deduct your wallet balance.")}
        </p>
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
                {t('Confirm')}
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
          {t('TopUp Successful')}
        </h2>
        <p>
          {amount}
          {' '}
          {selectedCurrency?.symbol}
          {' '}
          {t('top-up successful')}
        </p>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bttn-mid btn-ylo"
        >
          {t('Make Another TopUp')}
        </button>
      </div>
    );
  }
  return <></>;
};

export default TopUpStep;
