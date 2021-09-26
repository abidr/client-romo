import React from 'react';
import { BiCheck } from 'react-icons/bi';

const TransactionSteps = () => (
  <>
    <div className="transaction-steps">
      <div className="single-step active">
        <span><BiCheck /></span>
        Amount
      </div>
      <div className="single-step">
        <span><BiCheck /></span>
        Review
      </div>
      <div className="single-step">
        <span><BiCheck /></span>
        Success
      </div>
    </div>
  </>
);

export default TransactionSteps;
