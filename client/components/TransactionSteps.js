import React from 'react';
import { BiCheck } from 'react-icons/bi';

const TransactionSteps = ({ step }) => (
  <>
    <div className="transaction-steps">
      <div className={`single-step ${(step === 1) ? 'active' : null}`}>
        {step === 1 ? <span /> : <span><BiCheck /></span>}
        Amount
      </div>
      <div className={`single-step ${(step === 2) ? 'active' : null}`}>
        {(step === 1 || step === 2) ? <span /> : <span><BiCheck /></span>}
        Review
      </div>
      <div className={`single-step ${(step === 3) ? 'active' : null}`}>
        {(step === 3) ? <span><BiCheck /></span> : <span />}
        Success
      </div>
    </div>
  </>
);

export default TransactionSteps;
