/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiErrorCircle } from 'react-icons/bi';
import generalUpdate from '../../../lib/settingsUpdate';

const GeneralSettings = ({ settings }) => {
  const [actionLoader, setActionLoader] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      siteName: e.target?.siteName?.value,
      siteEmail: e.target?.siteEmail?.value,
      apiUrl: e.target?.apiUrl?.value,
      appUrl: e.target?.appUrl?.value,
    };
    generalUpdate(params, setActionLoader);
  };
  return (
    <>
      <div className="settings-box">
        <form onSubmit={handleUpdate}>
          <div className="single-profile">
            <label htmlFor="siteName">Site Name</label>
            <input id="siteName" name="siteName" type="text" placeholder="Site Name" defaultValue={settings?.site?.param1} />
          </div>
          <div className="single-profile">
            <label htmlFor="siteEmail">Site Email</label>
            <input id="siteEmail" name="siteEmail" type="email" placeholder="Site Email" defaultValue={settings?.site?.param2} />
          </div>
          <div className="single-profile">
            <label htmlFor="appUrl">App URL</label>
            <input id="appUrl" name="appUrl" type="text" placeholder="https://yourapp.com" defaultValue={settings?.appUrl?.param1} />
          </div>
          <div className="single-profile">
            <label htmlFor="apiUrl">Api URL</label>
            <input id="apiUrl" name="apiUrl" type="text" placeholder="https://yourapp.com/api" defaultValue={settings?.apiUrl?.param1} />
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

export default GeneralSettings;
