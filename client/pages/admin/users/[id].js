/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import {
  BiCheck, BiErrorCircle, BiTrash, BiX
} from 'react-icons/bi';
import Toggle from 'react-toggle';
import EditorHeader from '../../../components/admin/EditorHeader';
import Loader from '../../../components/Loader';
import SidebarAdmin from '../../../components/SidebarAdmin';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import { useKycById } from '../../../data/useKyc';
import { useUserById } from '../../../data/useUsers';
import withAuthAdmin from '../../../hoc/withAuthAdmin';
import { kycAdminAction } from '../../../lib/kycUpdate';
import { merchantCreate, merchantDeleteFromUser } from '../../../lib/merchantUpdate';
import { profileUpdateAdmin, userDelete } from '../../../lib/profileUpdate';

const UserEdit = ({ userData, settings }) => {
  const router = useRouter();
  const { id } = router.query;

  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useUserById(id);
  const { data: kyc, loading: kycLoading } = useKycById(id);

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      name: e.target?.name?.value,
      email: e.target?.email?.value,
      phone: e.target?.phone?.value,
      password: e.target?.password?.value,
      address: e.target?.address?.value,
      active: e.target?.active?.checked,
      kyc: e.target?.kyc?.checked,
      role: e.target?.status?.value,
    };
    profileUpdateAdmin(id, params, setActionLoader);
  };

  const handleUpdateMerchant = (e) => {
    e.preventDefault();
    const params = {
      name: e.target?.name?.value,
      email: e.target?.email?.value,
      address: e.target?.address?.value,
      status: e.target?.status?.value,
      userId: id
    };
    merchantCreate(params, setActionLoader);
  };

  const handleKyc = (type, updateId, userId) => {
    kycAdminAction(type, updateId, userId, setActionLoader);
  };

  const deleteInit = () => {
    confirmAlert({
      title: `#${data?.id} - ${data?.name}`,
      message: 'Are you sure to remove this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => userDelete(id, setActionLoader)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const deleteInitMerc = () => {
    confirmAlert({
      title: `#${data?.id} - ${data?.name}`,
      message: 'Are you sure to remove this user as merchant?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => merchantDeleteFromUser(id, data?.merchant?.id, setActionLoader)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  if (loading || kycLoading) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <UserHeaderAdmin />
      <SidebarAdmin userData={userData} settings={settings} />
      <div className="content-body">
        <div className="container-fluid">
          <EditorHeader name={`User #${data?.id}`} />
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <h4 className="box-title">User Details</h4>
                <div className="settings-box">
                  <form onSubmit={handleUpdate}>
                    <div className="single-profile">
                      <label htmlFor="userName">Full Name</label>
                      <input
                        id="userName"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="userEmail">Email</label>
                      <input
                        id="userEmail"
                        name="email"
                        type="email"
                        placeholder="Email"
                        defaultValue={data?.email}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="userPhone">Phone</label>
                      <input
                        id="userPhone"
                        name="phone"
                        type="text"
                        placeholder="Phone Number"
                        defaultValue={data?.phone}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="userAdd">Address</label>
                      <input
                        id="userAdd"
                        name="address"
                        type="text"
                        placeholder="Address"
                        defaultValue={data?.address}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="userPassword">Password</label>
                      <input
                        id="userPassword"
                        name="password"
                        type="password"
                        placeholder="Leave blank to keep unchanged"
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="userRole">Role</label>
                      {data?.role === 2 ? (
                        <p>This user is a merchant</p>
                      ) : (
                        <select name="role" id="userRole" defaultValue={data?.role}>
                          <option value="0">Admin</option>
                          <option value="1">User</option>
                        </select>
                      )}
                    </div>
                    <div className="single-profile">
                      <label>Active</label>
                      <Toggle
                        defaultChecked={data?.active}
                        name="active"
                      />
                    </div>
                    <div className="single-profile">
                      <label>KYC</label>
                      <Toggle
                        defaultChecked={data?.kyc}
                        name="kyc"
                      />
                    </div>
                    <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
                      {actionLoader ? (
                        <>
                          <Spinner animation="border" role="status" size="sm" />
                          {' '}
                          Update User
                        </>
                      ) : (
                        <>
                          <BiErrorCircle />
                          Update User
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="bttn-mid btn-danger ml-10"
                      onClick={() => deleteInit()}
                      disabled={actionLoader}
                    >
                      {actionLoader ? (
                        <>
                          <Spinner animation="border" role="status" size="sm" />
                          {' '}
                          Remove User
                        </>
                      ) : (
                        <>
                          <BiTrash />
                          Remove User
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="basic-card mb-20">
                <h4 className="box-title">KYC</h4>
                <div className="settings-box">
                  <Table striped hover className="dark-color details-table" responsive>
                    <tbody>
                      <tr>
                        <td className="head-td">Type</td>
                        <td>
                          {kyc?.type || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Front</td>
                        <td>
                          {kyc?.front ? <img src={`${settings?.apiUrl?.param1}/public/${kyc?.front}`} alt="Front Side" /> : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Back</td>
                        <td>
                          {kyc?.back ? <img src={`${settings?.apiUrl?.param1}/public/${kyc?.back}`} alt="Back Side" /> : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Selfie</td>
                        <td>
                          {kyc?.selfie ? <img src={`${settings?.apiUrl?.param1}/public/${kyc?.selfie}`} alt="Selfie" /> : 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Status</td>
                        <td>
                          {kyc?.status || 'Not Yet Submitted'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  {kyc?.status === 'submitted' && (
                  <>
                    {actionLoader ? (
                      <Spinner animation="border" role="status" size="sm" />
                    ) : (
                      <>
                        <button
                          onClick={() => handleKyc('accept', kyc?.id, data?.id)}
                          type="submit"
                          className="bttn-mid btn-ylo mr-10 mt-20"
                          disabled={actionLoader}
                        >
                          <BiCheck />
                          Approve
                        </button>
                        <button
                          onClick={() => handleKyc('decline', kyc?.id, data?.id)}
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
              <div className="basic-card">
                <h4 className="box-title">Convert To Merchant</h4>
                <div className="settings-box">
                  <form onSubmit={handleUpdateMerchant}>
                    {data?.role === 2 ? (
                      <button
                        type="button"
                        className="bttn-mid btn-danger ml-10"
                        onClick={() => deleteInitMerc()}
                        disabled={actionLoader}
                      >
                        {actionLoader ? (
                          <>
                            <Spinner animation="border" role="status" size="sm" />
                            {' '}
                            Remove Merchant
                          </>
                        ) : (
                          <>
                            <BiTrash />
                            Remove Merchant
                          </>
                        )}
                      </button>
                    ) : (
                      <>
                        <div className="single-profile">
                          <label htmlFor="merName">Merchant Name</label>
                          <input
                            id="merName"
                            name="name"
                            type="text"
                            placeholder="Merchant Name"
                          />
                        </div>
                        <div className="single-profile">
                          <label htmlFor="merEmail">Merchant Email</label>
                          <input
                            id="merEmail"
                            name="email"
                            type="email"
                            placeholder="Merchant Email"
                          />
                        </div>
                        <div className="single-profile">
                          <label htmlFor="merAdd">Merchant Address</label>
                          <input
                            id="merAdd"
                            name="address"
                            type="text"
                            placeholder="Address"
                          />
                        </div>
                        <div className="single-profile">
                          <label htmlFor="merStat">Status</label>
                          <select name="status" id="merStat">
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                          </select>
                        </div>
                        <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
                          {actionLoader ? (
                            <>
                              <Spinner animation="border" role="status" size="sm" />
                              {' '}
                              Convert To Merchant
                            </>
                          ) : (
                            <>
                              <BiErrorCircle />
                              Convert To Merchant
                            </>
                          )}
                        </button>
                      </>
                    )}
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

export default withAuthAdmin(UserEdit);
