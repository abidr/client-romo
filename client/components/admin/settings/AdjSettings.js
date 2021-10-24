/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiErrorCircle } from 'react-icons/bi';
import { settingsUpdate } from '../../../lib/settingsUpdate';
import inputNumber from '../../../utils/inputNumber';

const AdjSettings = ({ settings }) => {
  const [actionLoader, setActionLoader] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      param1: e.target?.param1?.value,
    };
    settingsUpdate('adjustments', params, setActionLoader);
  };
  return (
    <>
      <div className="settings-box">
        <form onSubmit={handleUpdate}>
          <div className="single-profile">
            <label htmlFor="exchangeFee">Exchange Fee (%)</label>
            <input
              id="exchangeFee"
              onKeyPress={inputNumber}
              name="param1"
              type="text"
              placeholder="Exchange Fee"
              defaultValue={settings?.adjustments?.param1}
            />
          </div>
          <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                Update Settings
              </>
            ) : (
              <>
                <BiErrorCircle />
                Update Settings
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdjSettings;
