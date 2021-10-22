import Link from 'next/link';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Pagination from 'react-js-pagination';
import useMerchants from '../../../data/useMerchants';
import statusColor from '../../../utils/statusColor';
import Loader from '../../Loader';

const MerchantList = ({ pending }) => {
  const [page, setPage] = useState(1);
  const [depId, setDepId] = useState('');
  const [status, setStatus] = useState(pending ? 'pending' : 'all');
  const [perPage, setPerPage] = useState(25);

  const { data, loading } = useMerchants(page, perPage, status, depId);

  return (
    <>
      <div className="filter">
        <div className="filter-box">
          <p>Merchant ID </p>
          <input type="text" value={depId} onChange={(e) => setDepId(e.target.value)} />
        </div>
        {!pending && (
        <div className="filter-box">
          <p>Status </p>
          <select value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
          </select>
        </div>
        )}
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
                <th scope="col">Merchant ID</th>
                <th scope="col">Status</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">User</th>
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
                      {history?.merId}
                    </strong>
                  </td>
                  <td>
                    <strong
                      className={`status ${statusColor(history?.status)}`}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {history?.status}
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
                      {history?.address}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      #
                      {history?.user?.id}
                      {' '}
                      <br />
                      {history?.user?.email}
                    </strong>
                  </td>
                  <td width="15%" align="center">
                    <Link href={`/admin/merchants/${history?.id}`}>
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

export default MerchantList;
