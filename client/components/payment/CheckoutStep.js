/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import {
  BiCheckCircle, BiLeftArrowAlt, BiRightArrowAlt
} from 'react-icons/bi';
import { useRequestByTrx } from '../../data/useRequests';
import checkoutRequest from '../../lib/checkoutRequest';
import Loader from '../Loader';

const CheckoutStep = ({ step, setStep, trx }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const { data, loading } = useRequestByTrx(trx);

  const handleSubmit = () => {
    checkoutRequest({
      trxIdCheckout: trx,
    }, setActionLoader, setStep);
  };

  if (loading) {
    return <Loader />;
  }

  if (!(data?.status === 'pending')) {
    return (
      <>
        <div className="transaction-review">
          <p>This transaction is not valid</p>
        </div>
      </>
    );
  }

  if (step === 2) {
    return (
      <>
        <div className="transaction-review">
          <h2>{data?.merchant?.name}</h2>
          <p>{data?.merchant?.address}</p>
          <Table striped hover responsive className="dark-color">
            <tbody>
              <tr>
                <td>Merchant ID</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.merchant?.merId}
                </td>
              </tr>
              <tr>
                <td>TRX ID</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.trxId}
                </td>
              </tr>
              <tr>
                <td>Amount</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.amount}
                  {' '}
                  {data?.currency}
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
                Pay
              </>
            )}
          </button>
          <p className="mt-10 mb-0">
            For any query please contact at:
            {' '}
            <a href={`mailto:${data?.merchant?.email}`}>{data?.merchant?.email}</a>
          </p>
        </div>
      </>
    );
  } if (step === 3) {
    return (
      <div className="transaction-success">
        <BiCheckCircle color="green" size={70} />
        <h2>
          Payment Successful
        </h2>
        <p>
          {data?.amount}
          {' '}
          {data?.currency}
          {' '}
          sent to
          {' '}
          {data?.merchant?.name}
        </p>
      </div>
    );
  }
  return <></>;
};

export default CheckoutStep;
