/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { BiCheck, BiX } from 'react-icons/bi';
import Loader from '../../../components/Loader';
import SidebarAdmin from '../../../components/SidebarAdmin';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import { useWithdrawById } from '../../../data/useWithdraws';
import withAuthAdmin from '../../../hoc/withAuthAdmin';
import withdrawUpdate from '../../../lib/withdrawUpdate';

const WithdrawEdit = ({ userData, settings }) => {
  const router = useRouter();
  const { id } = router.query;

  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useWithdrawById(id);

  const handleUpdate = (type) => {
    withdrawUpdate(id, type, setActionLoader);
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
            Withdraw #
            {data?.id}
          </h2>
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <h4 className="box-title">Withdraw Details</h4>
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
                        <td className="head-td">Amount</td>
                        <td>
                          {data?.amount}
                          {' '}
                          {data?.currency}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Fee</td>
                        <td>
                          {data?.fee}
                          {' '}
                          {data?.currency}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">User Getting</td>
                        <td>
                          {data?.total}
                          {' '}
                          {data?.currency}
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
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <h4 className="box-title">Preffered Method</h4>
                <div className="settings-box">
                  <Table striped hover className="dark-color details-table" responsive>
                    <tbody>
                      <tr>
                        <td className="head-td">Method</td>
                        <td style={{ textTransform: 'capitalize' }}>
                          {data?.method}
                        </td>
                      </tr>
                      {data?.params?.map((field) => (
                        <tr key={field?.name}>
                          <td className="head-td">{field?.name}</td>
                          <td>
                            {field?.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuthAdmin(WithdrawEdit);
