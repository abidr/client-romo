import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { usePaymentsAdmin } from '../../../data/usePayments';
import statusColor from '../../../utils/statusColor';
import Loader from '../../Loader';

const PaysHistoryAdmin = () => {
  const [page, setPage] = useState(1);
  const [depId, setDepId] = useState('');
  const [status, setStatus] = useState('all');
  const [perPage, setPerPage] = useState(25);

  const { data, loading } = usePaymentsAdmin(page, perPage, status, depId);

  return (
    <>
      <div className="filter">
        <div className="filter-box">
          <p>TRX ID </p>
          <input type="text" value={depId} onChange={(e) => setDepId(e.target.value)} />
        </div>
        <div className="filter-box">
          <p>Status </p>
          <select value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
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
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">TRX ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Merchant</th>
                <th scope="col">User</th>
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
                  <td><span>{dayjs(history?.createdAt).format('DD/MM/YYYY')}</span></td>
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
                      {history?.trxId}
                    </strong>
                  </td>
                  <td>
                    <strong className="cl-green">
                      {history?.amount}
                      {' '}
                      {history?.currency}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {history?.merchant}
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

export default PaysHistoryAdmin;