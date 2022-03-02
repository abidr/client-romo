/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle } from 'react-icons/bi';
import { settingsUpdate } from '../../../lib/settingsUpdate';

const ApiSettings = ({ settings }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const { t } = useTranslation();

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      param1: e.target?.param1?.value,
    };
    settingsUpdate('freecurrencyapi', params, setActionLoader, false);
    settingsUpdate('recaptcha', {
      param1: e.target?.recapSiteKey?.value,
      param2: e.target?.recapSecretKey?.value
    }, setActionLoader, false);
    settingsUpdate('reloadly', {
      param1: e.target?.reloadlyClientId?.value,
      param2: e.target?.reloadlyClientSecret?.value
    }, setActionLoader, true);
  };
  return (
    <>
      <div className="settings-box">
        <form onSubmit={handleUpdate}>
          <div className="single-profile">
            <label htmlFor="fcApi">{t('Free Currency API')}</label>
            <input
              id="fcApi"
              name="param1"
              type="text"
              placeholder={t('Free Currency API Key')}
              defaultValue={settings?.freecurrencyapi?.param1}
            />
          </div>
          <hr />
          <h4>Google Recaptcha</h4>
          <br />
          <div className="single-profile">
            <label htmlFor="recapSite">{t('Google Recaptcha Site Key')}</label>
            <input
              id="recapSite"
              name="recapSiteKey"
              type="text"
              placeholder={t('Google Recaptcha Site Key')}
              defaultValue={settings?.recaptcha?.param1}
            />
          </div>
          <div className="single-profile">
            <label htmlFor="recapSecret">{t('Google Recaptcha Secret Key')}</label>
            <input
              id="recapSecret"
              name="recapSecretKey"
              type="text"
              placeholder={t('Google Recaptcha Secret Key')}
              defaultValue={settings?.recaptcha?.param2}
            />
          </div>
          <hr />
          <h4>Reloadly</h4>
          <br />
          <div className="single-profile">
            <label htmlFor="redClient">{t('Reloadly Client ID')}</label>
            <input
              id="redClient"
              name="reloadlyClientId"
              type="text"
              placeholder={t('Reloadly Client ID')}
              defaultValue={settings?.reloadly?.param1}
            />
          </div>
          <div className="single-profile">
            <label htmlFor="redSecret">{t('Reloadly Client Secret')}</label>
            <input
              id="redSecret"
              name="reloadlyClientSecret"
              type="text"
              placeholder={t('Reloadly Client Secret')}
              defaultValue={settings?.reloadly?.param2}
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

export default ApiSettings;
