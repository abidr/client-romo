/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Dropdown, Image, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import {
  BiCheckCircle, BiLeftArrowAlt, BiRightArrowAlt
} from 'react-icons/bi';
import useCurrency from '../../data/useCurrency';
import useWallet from '../../data/useWallet';
import exchangeRequest from '../../lib/exchangeRequest';
import Loader from '../Loader';

const ExchangeStep = ({ step, setStep, settings }) => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedToCurrency, setSelectedToCurrency] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentToBalance, setCurrentToBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [actionLoader, setActionLoader] = useState(false);
  const { data, loading } = useCurrency();
  const { data: walletData, loading: walletLoading } = useWallet();

  useEffect(() => {
    setSelectedCurrency(data?.data[0]);
    setSelectedToCurrency(data?.data[1]);
  }, [data]);

  useEffect(() => {
    const walletFind = walletData?.find((wallet) => wallet.currency === selectedCurrency?.symbol);
    setCurrentBalance(walletFind?.balance);
    const walletToFind = walletData?.find((wallet) => wallet.currency === selectedToCurrency?.symbol);
    setCurrentToBalance(walletToFind?.balance);
  }, [selectedCurrency, selectedToCurrency, walletData]);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = () => {
    exchangeRequest({
      from: selectedCurrency?.symbol,
      to: selectedToCurrency?.symbol,
      amountFrom: parseFloat(amount, 10)
    }, setActionLoader, setStep);
  };

  if (loading || walletLoading) {
    return <Loader />;
  }

  const fromPriceUsd = selectedCurrency?.rateUsd;
  const toPriceUsd = selectedToCurrency?.rateUsd;
  const cryptoCondition = selectedToCurrency?.crypto || selectedCurrency?.crypto;
  const exchangeRate = cryptoCondition ? fromPriceUsd / toPriceUsd : toPriceUsd / fromPriceUsd;
  const amountTo = amount * exchangeRate;
  const fee = amountTo * (parseFloat(settings?.adjustments?.param1, 10) / 100);
  const total = amountTo - fee;

  if (step === 1) {
    return (
      <>
        <form onSubmit={handleNext}>
          <div className="currency-amount">
            <label htmlFor="currencySelector">From</label>
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
            <label htmlFor="currencyToSelector">To</label>
            <Dropdown id="currencyToSelector">
              <Dropdown.Toggle className="bttn-small btn-emt" variant="link">
                <Image src={selectedToCurrency?.icon} rounded />
                {selectedToCurrency?.symbol}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {data?.data?.map((currency) => (
                  <Dropdown.Item
                    key={currency.id}
                    onClick={() => setSelectedToCurrency(currency)}
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
                  {currentToBalance}
                  {' '}
                  {selectedToCurrency?.symbol}
                </span>
              </p>
            </Dropdown>
          </div>
          <div className="currency-amount">
            <label>Amount</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="text"
              required
            />
          </div>
          <div className="bttns mt-30">
            <button
              type="submit"
              className="bttn-mid btn-ylo"
            >
              <BiRightArrowAlt />
              Next
            </button>
          </div>
        </form>
      </>
    );
  } if (step === 2) {
    return (
      <>
        <div className="transaction-review">
          <h4>Review Details</h4>
          <Table striped hover responsive className="dark-color">
            <tbody>
              <tr>
                <td>Exchange Rate</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {exchangeRate}
                  {' '}
                  {selectedToCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>Exchange From</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {amount}
                  {' '}
                  {selectedCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>Exchange To</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {amountTo}
                  {' '}
                  {selectedToCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>
                  Fee
                </td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {fee}
                  {' '}
                  {selectedToCurrency?.symbol}
                </td>
              </tr>
              <tr>
                <td>You Get</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {total}
                  {' '}
                  {selectedToCurrency?.symbol}
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
            Back
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
                Processing
              </>
            ) : (
              <>
                <BiRightArrowAlt />
                Exchange
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
          Exchange Request Submitted
        </h2>
        <p>
          We will review your exchange request and add the fund to your desired wallet,
          please allow upto 24 hours for us to review.
        </p>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="bttn-mid btn-ylo"
        >
          Make Another Exchange
        </button>
      </div>
    );
  }
  return <></>;
};

export default ExchangeStep;
