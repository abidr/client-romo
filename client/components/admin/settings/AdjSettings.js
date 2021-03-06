/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle } from 'react-icons/bi';
import { settingsUpdate } from '../../../lib/settingsUpdate';
import inputNumber from '../../../utils/inputNumber';

const AdjSettings = ({ settings }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const { t } = useTranslation();

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      param1: e.target?.param1?.value,
      param2: e.target?.param2?.value,
    };
    settingsUpdate('adjustments', params, setActionLoader);
  };
  return (
    <>
      <div className="settings-box">
        <form onSubmit={handleUpdate}>
          <div className="single-profile">
            <label htmlFor="exchangeFee">
              {t('Exchange Fee')}
              {' '}
              (%)
            </label>
            <input
              id="exchangeFee"
              onKeyPress={inputNumber}
              name="param1"
              type="text"
              placeholder={t('Exchange Fee')}
              defaultValue={settings?.adjustments?.param1}
            />
          </div>
          <div className="single-profile">
            <label htmlFor="agFee">
              {t('Agent Withdraw Fee')}
              {' '}
              (%)
            </label>
            <input
              id="agFee"
              onKeyPress={inputNumber}
              name="param2"
              type="text"
              placeholder={t('Agent Withdraw Fee')}
              defaultValue={settings?.adjustments?.param2}
            />
          </div>
          <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                {t('Update Settings')}
              </>
            ) : (
              <>
                <BiErrorCircle />
                {t('Update Settings')}
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdjSettings;
