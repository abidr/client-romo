/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { BiCheck, BiX } from 'react-icons/bi';
import Loader from '../../../components/Loader';
import SidebarAdmin from '../../../components/SidebarAdmin';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import { useExchangeById } from '../../../data/useExchanges';
import withAuthAdmin from '../../../hoc/withAuthAdmin';
import exchangeUpdate from '../../../lib/exchangeUpdate';

const ExchangeEdit = ({ userData, settings }) => {
  const router = useRouter();
  const { id } = router.query;

  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useExchangeById(id);

  const handleUpdate = (type) => {
    exchangeUpdate(id, type, setActionLoader);
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
          <h2 className="mb-30">
            Exchange #
            {data?.id}
          </h2>
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <div className="settings-box">
                  <Table striped hover className="dark-color details-table" responsive>
                    <tbody>
                      <tr>
                        <td className="head-td">Status</td>
                        <td style={{ textTransform: 'capitalize' }}>
                          {data?.status}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Amount From</td>
                        <td>
                          {data?.amountFrom}
                          {' '}
                          {data?.from}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Amount To</td>
                        <td>
                          {data?.amountTo}
                          {' '}
                          {data?.to}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Exchange Rate</td>
                        <td>
                          {data?.exchangeRate}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Fee</td>
                        <td>
                          {data?.fee}
                          {' '}
                          {data?.to}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">User Getting</td>
                        <td>
                          {data?.total}
                          {' '}
                          {data?.to}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">User</td>
                        <td>
                          {data?.user?.email}
                          {' '}
                          (#
                          {data?.user?.id}
                          )
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {data?.status === 'pending' && (
                  <>
                    {actionLoader ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdate('accept')}
                          type="submit"
                          className="bttn-mid btn-ylo mr-10 mt-20"
                          disabled={actionLoader}
                        >
                          <BiCheck />
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdate('decline')}
                          type="submit"
                          className="bttn-mid btn-danger mt-20"
                          disabled={actionLoader}
                        >
                          <BiX />
                          Decline
                        </button>
                      </>
                    )}
                  </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthAdmin(ExchangeEdit);
