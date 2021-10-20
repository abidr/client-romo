/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiErrorCircle } from 'react-icons/bi';
import Toggle from 'react-toggle';
import Loader from '../../../../components/Loader';
import SidebarAdmin from '../../../../components/SidebarAdmin';
import UserHeaderAdmin from '../../../../components/UserHeaderAdmin';
import { useGatewayByValue } from '../../../../data/useGateways';
import withAuthAdmin from '../../../../hoc/withAuthAdmin';
import gatewayUpdate from '../../../../lib/gatewayUpdate';

const GatewayEdit = ({ userData, settings }) => {
  const router = useRouter();
  const { value } = router.query;

  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useGatewayByValue(value);

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      api_key: e.target?.api_key?.value,
      secret_key: e.target?.secret_key?.value,
      email: e.target?.email?.value,
      ex1: e.target?.ex1?.value,
      ex2: e.target?.ex2?.value,
      active: e.target?.active?.checked,
    };
    gatewayUpdate(value, params, setActionLoader);
  };

  if (loading) {
    return <Loader height="100vh" />;
  }
  return (
    <>
      <UserHeaderAdmin />
      <SidebarAdmin userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <h2 className="mb-30">{data?.data?.name}</h2>
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <div className="settings-box">
                  <form onSubmit={handleUpdate}>
                    {data?.fields?.api_key && (
                    <div className="single-profile">
                      <label htmlFor="apiKey">API Key</label>
                      <input id="apiKey" name="api_key" type="text" placeholder="API Key" defaultValue={data?.data?.api_key} />
                    </div>
                    )}
                    {data?.fields?.secret_key && (
                    <div className="single-profile">
                      <label htmlFor="secretKey">Secret Key</label>
                      <input id="secretKey" name="secret_key" type="text" placeholder="Secret Key" defaultValue={data?.data?.secret_key} />
                    </div>
                    )}
                    {data?.fields?.email && (
                    <div className="single-profile">
                      <label htmlFor="emailGateway">Email</label>
                      <input id="emailGateway" name="email" type="email" placeholder="Email" defaultValue={data?.data?.email} />
                    </div>
                    )}
                    {data?.fields?.ex1?.status && (
                    <div className="single-profile">
                      <label htmlFor="ex1">{data?.fields?.ex1?.label}</label>
                      <input id="ex1" name="ex1" type="text" placeholder={data?.fields?.ex1?.label} defaultValue={data?.data?.ex1} />
                    </div>
                    )}
                    {data?.fields?.ex2?.status && (
                    <div className="single-profile">
                      <label htmlFor="ex2">{data?.fields?.ex2?.label}</label>
                      <input id="ex2" name="ex2" type="text" placeholder={data?.fields?.ex2?.label} defaultValue={data?.data?.ex2} />
                    </div>
                    )}
                    <div className="single-profile">
                      <label>Active</label>
                      <Toggle
                        defaultChecked={data?.data?.active}
                        name="active"
                      />
                    </div>
                    <div className="single-profile">
                      <label>Supported Currencies</label>
                      <strong>
                        {data?.fields?.supportedCurrencies?.join(', ')}
                      </strong>
                    </div>
                    <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
                      {actionLoader ? (
                        <>
                          <Spinner animation="border" role="status" size="sm" />
                          {' '}
                          Update Gateway
                        </>
                      ) : (
                        <>
                          <BiErrorCircle />
                          Update Gateway
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthAdmin(GatewayEdit);
