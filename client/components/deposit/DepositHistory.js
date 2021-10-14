import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useDepositAll } from '../../data/useDeposits';
import Loader from '../Loader';

const DepositHistory = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useDepositAll(page, 10);

  if (loading) {
    return <Loader height="300px" />;
  }

  return (
    <>
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((history) => (
            <tr key={history.id}>
              <td><span>{dayjs(history.createdAt).format('DD/MM/YYYY')}</span></td>
              <td><strong className="status success" style={{ textTransform: 'capitalize' }}>{history.status}</strong></td>
              <td>
                <strong>
                  Deposit Request #
                  {history.id}
                </strong>
              </td>
              <td>
                <strong>
                  +
                  {history.amount}
                  {' '}
                  {history.currency}
                </strong>
              </td>
              <td><strong className="cl-red" style={{ textTransform: 'capitalize' }}>{history.payment_method}</strong></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={data?.count || 10}
        pageRangeDisplayed={10}
        onChange={(pageNumber) => setPage(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
};

export default DepositHistory;
