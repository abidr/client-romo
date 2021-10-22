import Link from 'next/link';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Pagination from 'react-js-pagination';
import useUsers from '../../../data/useUsers';
import Loader from '../../Loader';

const UserList = () => {
  const [page, setPage] = useState(1);
  const [depId, setDepId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [perPage, setPerPage] = useState(25);

  const { data, loading } = useUsers(page, perPage, status, depId, email, role);

  const rolePicker = (roleInt) => {
    if (roleInt === 0) {
      return 'Admin';
    } if (roleInt === 2) {
      return 'Merchant';
    }
    return 'User';
  };

  return (
    <>
      <div className="filter">
        <div className="filter-box">
          <p>User ID </p>
          <input type="text" value={depId} onChange={(e) => setDepId(e.target.value)} />
        </div>
        <div className="filter-box">
          <p>User Email </p>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="filter-box">
          <p>Status </p>
          <select value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div className="filter-box">
          <p>Role </p>
          <select value={role} name="role" onChange={(e) => setRole(e.target.value)}>
            <option value="all">All</option>
            <option value="0">Admin</option>
            <option value="1">User</option>
            <option value="2">Merchant</option>
          </select>
        </div>
        <div className="filter-box">
          <p>Per Page </p>
          <select value={perPage} name="status" onChange={(e) => setPerPage(e.target.value)}>
            <option value="20">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loader height="300px" />
      ) : (
        <>
          <Table striped hover className="dark-color" responsive>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">KYC</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((history) => (
                <tr key={history?.id}>
                  <td>
                    <strong>
                      #
                      {history?.id}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {history?.name}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {history?.email}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {history?.active ? 'Active' : 'Inactive'}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {rolePicker(history?.role)}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {history?.kyc ? 'Verified' : 'Pending'}
                    </strong>
                  </td>
                  <td width="15%" align="center">
                    <Link href={`/admin/users/${history?.id}`}>
                      <a className="action-btn">
                        <FiEdit />
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={data?.count || perPage}
            pageRangeDisplayed={perPage}
            onChange={(pageNumber) => setPage(pageNumber)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </>
      )}
    </>
  );
};

export default UserList;
