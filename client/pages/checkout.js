import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CheckoutStep from '../components/payment/CheckoutStep';
import TransactionSteps from '../components/TransactionSteps';
import withAuth from '../hoc/withAuth';

const Checkout = () => {
  const [step, setStep] = useState(2);
  const router = useRouter();
  const { trx } = router.query;
  return (
    <div className="checkout-cont">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="deposit-box basic-card">
              <TransactionSteps step={step} checkout />
              <CheckoutStep step={step} setStep={setStep} trx={trx} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Checkout);
