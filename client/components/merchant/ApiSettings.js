/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle } from 'react-icons/bi';
import { useApiKey } from '../../data/useMerchants';
import { apiGenerate } from '../../lib/storeUpdate';
import Loader from '../Loader';

const ApiSettings = () => {
  const [actionLoader, setActionLoader] = useState(false);
  const { data, loading } = useApiKey();
  const { t } = useTranslation();

  const handleUpdate = (e) => {
    e.preventDefault();
    apiGenerate(setActionLoader);
  };

  if (loading) {
    <Loader height="600px" />;
  }

  return (
    <div className="basic-card">
      <h3 className="box-title">{t('API Settings')}</h3>
      <div className="settings-box">
        <form onSubmit={handleUpdate}>
          {!data?.error && (
            <>
              <div className="single-profile">
                <label htmlFor="secret">{t('API Key (Token)')}</label>
                <input id="secret" name="secret" type="text" disabled placeholder={t('API Key')} defaultValue={data?.secret} />
              </div>
              <p>
                <a target="_blank" href="https://app.swaggerhub.com/apis-docs/awdpay-v2/awdpay-v2/2.0.0#/" rel="noreferrer">API Documentation</a>
              </p>
            </>
          )}
          <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                {data?.error ? t('Generate') : t('Regenerate')}
              </>
            ) : (
              <>
                <BiErrorCircle />
                {data?.error ? t('Generate') : t('Regenerate')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiSettings;
