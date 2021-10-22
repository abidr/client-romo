/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { BiErrorCircle } from 'react-icons/bi';
import EditorHeader from '../../../components/admin/EditorHeader';
import Loader from '../../../components/Loader';
import SidebarAdmin from '../../../components/SidebarAdmin';
import UserHeaderAdmin from '../../../components/UserHeaderAdmin';
import { useMerchantById } from '../../../data/useMerchants';
import withAuthAdmin from '../../../hoc/withAuthAdmin';
import merchantUpdate from '../../../lib/merchantUpdate';

const MerchantEdit = ({ userData, settings }) => {
  const router = useRouter();
  const { id } = router.query;

  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useMerchantById(id);

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = {
      name: e.target?.name?.value,
      email: e.target?.email?.value,
      address: e.target?.address?.value,
      status: e.target?.status?.value,
    };
    merchantUpdate(id, params, setActionLoader);
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
          <EditorHeader name={`Merchant #${data?.id}`} />
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="basic-card">
                <h4 className="box-title">Merchant Details</h4>
                <div className="settings-box">
                  <form onSubmit={handleUpdate}>
                    <div className="single-profile">
                      <label htmlFor="merId">Merchant ID</label>
                      <input
                        id="merId"
                        disabled
                        name="merId"
                        type="text"
                        placeholder="Merchant ID"
                        defaultValue={data?.merId}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="merName">Merchant Name</label>
                      <input
                        id="merName"
                        name="name"
                        type="text"
                        placeholder="Merchant Name"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="merEmail">Merchant Email</label>
                      <input
                        id="merEmail"
                        name="email"
                        type="email"
                        placeholder="Merchant Email"
                        defaultValue={data?.email}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="merAdd">Merchant Address</label>
                      <input
                        id="merAdd"
                        name="address"
                        type="text"
                        placeholder="Merchant Address"
                        defaultValue={data?.address}
                      />
                    </div>
                    <div className="single-profile">
                      <label htmlFor="merStatus">Status</label>
                      <select name="status" id="merStatus" defaultValue={data?.status}>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                      </select>
                    </div>
                    <button type="submit" className="bttn-mid btn-ylo" disabled={actionLoader}>
                      {actionLoader ? (
                        <>
                          <Spinner animation="border" role="status" size="sm" />
                          {' '}
                          Update Merchant
                        </>
                      ) : (
                        <>
                          <BiErrorCircle />
                          Update Merchant
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="basic-card mb-20">
                <h4 className="box-title">Proof</h4>
                <div className="settings-box">
                  <Table striped hover className="dark-color details-table" responsive>
                    <tbody>
                      <tr>
                        <td className="head-td">File</td>
                        <td>
                          {data?.proof ? (
                            <a href={data?.proof}>Download/View</a>
                          ) : 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="basic-card">
                <h4 className="box-title">User</h4>
                <div className="settings-box">
                  <Table striped hover className="dark-color details-table" responsive>
                    <tbody>
                      <tr>
                        <td className="head-td">ID</td>
                        <td>
                          #
                          {data?.user?.id}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Name</td>
                        <td>
                          {data?.user?.name}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Email</td>
                        <td>
                          {data?.user?.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Address</td>
                        <td>
                          {data?.user?.address || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Phone</td>
                        <td>
                          {data?.user?.phone || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">Activation</td>
                        <td>
                          {data?.user?.active ? 'Active' : 'Inactive'}
                        </td>
                      </tr>
                      <tr>
                        <td className="head-td">KYC</td>
                        <td>
                          {data?.user?.kyc ? 'Verified' : 'Pending Verification'}
                        </td>
                      </tr>
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

export default withAuthAdmin(MerchantEdit);
